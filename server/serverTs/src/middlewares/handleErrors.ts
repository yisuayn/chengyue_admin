import { Context, Next } from 'koa';
import { ResHttpError } from '../constants/res-http-error';

export const errorHandler = async (ctx: Context, next: Next) => {
    // ... error handling logic
    try {
        await next();
    } catch (err: unknown) {
        if (err instanceof ResHttpError) {
            ctx.status = err.status;
            ctx.body = {
                name: err.name,
                message: err.message,
                status: err.status
            };
            ctx.logger.error(`[${ctx.method} ${ctx.url}] ${err.message}`);
        } else {
            ctx.status = 500;
            ctx.body = { error: 'Internal Server Error' };
            ctx.logger.error(`[${ctx.method} ${ctx.url}] Internal Server Error: ${err}`);
        }
        ctx.app.emit('error', err, ctx);
    }
};