// import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Application, { Context } from 'koa';
import mongoose from 'mongoose';
import { connectDB } from './database/db';
import { initializeRedis } from './database/redis';
import { initRoutes } from './routes/example';
import logger from './lib/logger';
import { NewApolloFetcher } from './lib/newGetApollo';
import { ResHttpError } from './constants/res-http-error';
import { loggerMiddleware } from './middlewares/logger';
import { errorHandler } from './middlewares/handleErrors';

function respondSuccess(ctx: Context, data: object, message: string = '') {
    ctx.status = 200; // 设置状态码为 200
    ctx.body = { data: data, message: message }; // 设置统一的响应格式
}
  

export async function createServer() {
    const app = new Application();
    const PORT = process.env.PORT || 3000;
    
    app.context.ResHttpError = ResHttpError;
    app.context.success = function (this: Context, data: object, message: string = '') {
        respondSuccess(this, data, message);
    };

    // Logger middleware
    app.use(async (ctx: Context, next) => {
        if (ctx.path === '/favicon.ico') {
            ctx.status = 204; // No Content
            return;
        }
        ctx.app = app;
        ctx.logger = logger;
        await next();
    });

    // Body parser middleware
    app.use(bodyParser());
    app.use(loggerMiddleware);
    app.use(errorHandler);

    const configFetcher = NewApolloFetcher.getInstance();
    const loadConfiguration = async () => {
        try {
            const namespaces = ['SERVICE_BASIC', 'SERVICE_EXTERNAL', 'application'];
            const configs: Array<any> = [];
            for (const ns of namespaces) {
                const configFetcherData = await configFetcher.namespace(ns);
                configs.push(configFetcherData);
                await configFetcher.watchConfig(ns, async () => {
                    logger.info('Configuration has changed. Reloading...');
                    if (ns === 'SERVICE_BASIC') {
                        await Promise.all([ reconnectDatabase(), initializeRedis()]);
                    }
                }, app);
            }
            app.context.config = Object.fromEntries(configs.map((config, i) => [namespaces[i], config]));
        } catch (error) {
            logger.error('Failed to load configuration:', error);
            process.exit(1);
        }
    };
    const reconnectDatabase = async () => {
        if (mongoose.connection.readyState === 1) {
            await mongoose.disconnect();
        }
        await connectDB().catch(err => {
            logger.error('数据库连接失败: ', err);
        });
    };
    app.use(async (ctx, next) => {
        if (!ctx.config) {
            ctx.config = await Promise.all([
                configFetcher.readConfigFromFileCache('application'),
                configFetcher.readConfigFromFileCache('SERVICE_EXTERNAL'),
                configFetcher.readConfigFromFileCache('SERVICE_BASIC'),
            ]);
        }
        await next();
    });
    initRoutes(app);

    app.listen(PORT, async () => {
        logger.info(`Worker ${process.pid} is running on port ${PORT}`);
        // Connect to the database
        await Promise.all([reconnectDatabase(), initializeRedis()]);
        logger.info(`server run: http://localhost:${PORT}`);
    });

    await loadConfiguration();
}
