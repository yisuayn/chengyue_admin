import { Context, Next } from 'koa';

export const loggerMiddleware = async (ctx: Context, next: Next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    if (ctx.path !== '/ping') {
        ctx.logger.info(`${ctx.method} ${ctx.url} - ${ms}ms - IP: ${ctx.request.ip} - ${JSON.stringify({
            method: ctx.request.method,
            route: ctx.path,
            query: ctx.request.query,
            body: ctx.request.body,
            ip: ctx.request.ip,
            time: new Date().toISOString(),
        })}`);
    }
};
