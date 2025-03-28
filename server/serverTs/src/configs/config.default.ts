import { parseRedisUrl } from '../lib/parser';
import { NewApolloFetcher } from '../lib/newGetApollo';
import logger from '../lib/logger';
import os from 'os';
const cgs = NewApolloFetcher.getInstance();

interface RedisConfig {
  client: {
    host: string,
    password: string,
    port: number,
    db: number,
    connectTimeout: number,
  },
  // Add more Redis configuration options if needed
}

interface MongoDBConfig {
  uri?: string,
  options?: object,
  // Add more MongoDB configuration options if needed
}

interface ServerConfig {
  port: number,
  // Add more server configuration options if needed
}

interface Config {
  env?: string,
  port?: number,
  sso_api_id?: string,
  sso_app_key?: string;
  sso_app_secret?: string;
  app_token_expire?: number;
  redis: RedisConfig,
  mongodb: MongoDBConfig,
  server: ServerConfig,
  /** 运行核数 */
  runningCPUs: number,
}

const config: Config = {
    env: 'test',

    redis: {
        client: { ...parseRedisUrl(process.env.APP_REDIS_1 || 'redis://localhost:6379'), connectTimeout: 5000 },
    // Add more Redis configuration options if needed
    },
    mongodb: {
        uri: process.env.APP_MONGODB_URI || 'mongodb://localhost:27017/paramecium',
    // Add more MongoDB configuration options if needed
    },
    server: {
        port: Number(process.env.PORT) || 3000,
    // Add more server configuration options if needed
    },
    runningCPUs: Number(process.env.NUM_CPUS) || os.cpus().length,
};

async function fetchServerConfig() {
    try {
        const [externalServiceNs, basicServiceNs, applicationNs] = await Promise.all([
            cgs.readConfigFromFileCache('SERVICE_EXTERNAL'),
            cgs.readConfigFromFileCache('SERVICE_BASIC'),
            cgs.readConfigFromFileCache('application')
        ]);
        return {
            mongodb: {
                uri: basicServiceNs['mongodb.uri'] || 'mongodb://localhost:27017/paramecium',
            },
            redis: {
                client: { ...parseRedisUrl(basicServiceNs['redis.uri'] || 'redis://localhost:6379')},
            },
            white_ip_list: applicationNs['white_ip_list'] || [],
        };
    } catch (err) {
        logger.error('Error getting server config:', err);
    }
}

async function reloadConfig() {
    try {
    // 重新解析环境变量或配置文件
        const newRedisConfig = { ...parseRedisUrl(process.env.APP_REDIS_1 || 'redis://localhost:6379'), connectTimeout: 5000 };
        const newMongoDBUri = process.env.APP_MONGODB_URI;
        const newServerPort = Number(process.env.PORT) || 3000;
        const newShortHost = JSON.parse(process.env.SHORT_HOST || '{}');
        const newRunningCPUs = Number(process.env.NUM_CPUS) || os.cpus().length;

        // 获取最新的服务器配置
        const serverConfig = await fetchServerConfig();

        // 更新config对象
        config.redis.client = newRedisConfig;
        config.mongodb.uri = newMongoDBUri;
        config.server.port = newServerPort;
        config.runningCPUs = newRunningCPUs;

        // 确保也更新了来自fetchServerConfig的配置
        if (serverConfig) {
            return { ...config, ...serverConfig };
        }

        logger.info('Configuration reloaded successfully.');
        return config;
    } catch (err) {
        logger.error('Error reloading configuration:', err);
    }
}

/**
 * @description 获取最新服务器配置
 * @returns 
 */
async function getServerConfig() {
    const serverConfig = await fetchServerConfig();
    return { ...config, ...serverConfig };
}

export { getServerConfig, reloadConfig };