// shortLinkRoutes.ts
import Koa from 'koa';
import Router from 'koa-router';

export const initRoutes = (app: Koa) => {

    const router = new Router();

    router.get('/', async (ctx: Koa.Context) => {
        ctx.type = 'html';
        ctx.body = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>🐔，这是后端第一个接口</title>
                <style>
                    html, body {
                        height: 100%;
                        margin: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background-color: #f5f5f5;
                        font-family: Arial, sans-serif;
                    }
                    .rainbow-text {
                        font-size: 4rem;
                        font-weight: bold;
                        text-align: center;
                        background-image: linear-gradient(to right, 
                            #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3);
                        -webkit-background-clip: text;
                        background-clip: text;
                        color: transparent;
                        padding: 20px;
                        text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
                    }
                </style>
            </head>
            <body>
                <div class="rainbow-text">Hello World!</div>
            </body>
            </html>
        `;
    });    

    app.use(router.routes());
    app.use(router.allowedMethods());
};
