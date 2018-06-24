import { resolve } from 'path'
import fs from 'fs'
import Router from 'koa-router'

export default function(app) {
    const router = new Router()

    // 所有路由都渲染到此模板
    // 以便把路由交给 Vue 管理
    router.get('*', async (ctx, next) => {
        const template = fs.readFileSync(resolve(__dirname, '../views/index.html'), 'utf-8');
        ctx.body = template;
    });

    app.use(router.routes())
      .use(router.allowedMethods())
}
