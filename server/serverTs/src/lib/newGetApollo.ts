import * as _ from 'lodash';
import * as path from 'path';
import * as superagent from 'superagent';
import * as fs from 'fs';
import { createHmac } from 'crypto';
import logger from './logger';
import Application = require('koa');
import * as mkdirp from 'mkdirp';

/** Apollo的请求配置 */
interface ApolloConfig {
    /** 配置所在域名 */
    host: string;
    /** 配置APPID */
    appId: string;
    cluster?: string;
    /** 配置密钥 */
    secret: string;
  }
  
interface IDiffObject {
  del: { [key: string]: any };
  add: { [key: string]: any };
  update: { [key: string]: any };
  hasModify: boolean;
}

interface NamespaceConfig {
  [key: string]: any;
}
const namespaceConfig: NamespaceConfig = {};

interface LastReleaseKeyMap {
  [namespace: string]: string;
}

class NewApolloFetcher {
    private static instance: NewApolloFetcher;
    private apolloConfig: ApolloConfig;
    private lastReleaseKeyMap: LastReleaseKeyMap = {};
    /** 间隔时间，单位为毫秒，可以根据需要调整 */
    private fetchInterval: number = 10000;
    /** 配置缓存文件所在目录 */
    private cacheFileDir: string;

    private constructor(config?: ApolloConfig) {
        this.apolloConfig = config || {
            host: process.env.APOLLO_HOST || '',
            appId: process.env.APOLLO_APP_ID || '',
            cluster: process.env.APOLLO_CLUSTER || undefined,
            secret: process.env.APOLLO_SECRET || '',
        };
        this.cacheFileDir = path.join(__dirname, '..', 'run');
    }

    public static getInstance(config?: ApolloConfig): NewApolloFetcher {
        if (!NewApolloFetcher.instance) {
            NewApolloFetcher.instance = new NewApolloFetcher(config);
        }
        return NewApolloFetcher.instance;
    }

    private signature(timestamp: number, pathWithQuery: string): string {
        const { secret } = this.apolloConfig;
        const stringToSign = timestamp + '\n' + pathWithQuery;
        return createHmac('sha1', secret).update(stringToSign).digest('base64');
    }

    private newSimpleDiffObject(originObj: { [key: string]: any }, targetObj: { [key: string]: any }) {
        const obj: IDiffObject = { add: {}, del: {}, update: {}, hasModify: false };  
  
        // 找出在targetObj中但不在originObj中的属性  
        obj.add = _.pickBy(targetObj, (value, key) => !(key in originObj));  
  
        // 找出已修改或删除的属性  
        const updatedOrDeleted = _.pickBy(originObj, (value, key) => !(key in targetObj) || !_.isEqual(value, targetObj[key]));  
        obj.del = _.pickBy(updatedOrDeleted, (value, key) => !(key in targetObj));  
        obj.update = _.omit(updatedOrDeleted, _.keys(obj.del));  
  
        // 检查是否存在变更  
        obj.hasModify = (Object.keys(obj.add).length + Object.keys(obj.update).length + Object.keys(obj.del).length) > 0;  
  
        return obj;
    }

    /**
     * 获取指定命名空间配置
     * @param namespace 命名空间
     */
    async namespace(namespace: string): Promise<object | undefined> {
        if (!_.isEmpty(namespaceConfig[namespace])) {
            return namespaceConfig[namespace];
        }
        
        try {
            const ns = await this.fetch(namespace);
            namespaceConfig[namespace] = ns.configurations;
        
            // 设置最新版本标识
            this.lastReleaseKeyMap[namespace] = ns.releaseKey;
        } catch (e: any) {
            if (e.status === 304) logger.info(`${namespace} 没有变化,可忽略`);
        }
        return namespaceConfig[namespace];
    }
    /**
     * @description 将配置写入文件缓存
     * @param namespace 
     */
    private async writeConfigCache(namespace: string): Promise<void> {
        const config = await this.namespace(namespace);
        // 缓存位置固定，不做配置
        const filePath = path.join(this.cacheFileDir, namespace + '_cgs.json');
        // 写到文件
        await mkdirp.mkdirp(this.cacheFileDir);
        fs.writeFileSync(filePath, JSON.stringify(config, null, 3));
    }

    /**
     * @description 获取Apollo中心的配置
     * @param namespace 
     * @returns 
     */
    public async fetch(namespace: string): Promise<{ configurations: any; releaseKey: any }> {
        if (!namespace) {
            throw new Error('no namespace fetch config fail');
        }

        const { host, appId, cluster } = this.apolloConfig;
        const path = `/configs/${appId}/${cluster || 'default'}/${namespace}`;
        const url = new URL(path, host);
        if (this.lastReleaseKeyMap[namespace]) {
            url.search = `releaseKey=${this.lastReleaseKeyMap[namespace]}`;
        }

        const timestamp = Date.now();
        const pathWithQuery = url.pathname + url.search;
        const sign = this.signature(timestamp, pathWithQuery);
        const authorization = `Apollo ${appId}:${sign}`;
        const { body } = await superagent
            .get(url.href)
            .set('Authorization', authorization)
            .set('Timestamp', String(timestamp))
            .timeout(5000);
        const { configurations, releaseKey } = body;

        return {
            configurations,
            releaseKey,
        };
    }

    /**
     * @description 监听配置是否发生变化，如果发生变化，对本地文档和内存中的namespace进行更新
     * @param namespace 
     * @param handler 
     * @param app 
     */
    public async watchConfig(namespace: string, handler: any, app: Application): Promise<void> {
        setInterval(async () => {
            let data = { configurations: {}, releaseKey: this.lastReleaseKeyMap[namespace] };

            try {
                data = await this.fetch(namespace);
            } catch (e) {
                const { status } = e as any;
                if (status !== 304) {
                    throw e;
                }
            }

            const { configurations, releaseKey } = data;
            const lastVersion = this.lastReleaseKeyMap[namespace];

            if (releaseKey && releaseKey !== lastVersion && namespaceConfig[namespace]) {
                const update = this.newSimpleDiffObject(namespaceConfig[namespace], configurations);

                // 设置最新版本标识
                this.lastReleaseKeyMap[namespace] = releaseKey;

                // 配置发生变化
                if (update.hasModify) {
                    logger.info(`${namespace} 发生变化, config: ${JSON.stringify({add: update.add, del: update.del, update: update.update })}`);
                    namespaceConfig[namespace] = configurations;
                    this.writeConfigCache(namespace);
                    await handler({ update }, app);
                }
            }
        }, this.fetchInterval);
    }

    /**
    * 读文件缓存
    * @param {*} namespace 命名空间
    */
    public async readConfigFromFileCache(namespace: string) {
        if (!_.isEmpty(namespaceConfig[namespace])) {
            return namespaceConfig[namespace];
        }
        // 缓存位置固定，不做配置
        const filePath = path.join(this.cacheFileDir, namespace + '_cgs.json');
        let config = {};
        try {
            if (fs.existsSync(filePath)) {
                const jsonData = fs.readFileSync(filePath, 'utf-8');
                config = JSON.parse(jsonData);
            } else { // 文件不存在的情况下，重新获取并生成文件缓存
                const ns = await this.fetch(namespace);
                namespaceConfig[namespace] = ns.configurations;
                await this.writeConfigCache(namespace);
                config = namespaceConfig[namespace];
                return config;
            }
        } catch (e: unknown) {
            logger.error(`Error reading JSON file: ${e}`);
        }
        namespaceConfig[namespace] = config;

        return config;
    }
}

export { NewApolloFetcher, IDiffObject };