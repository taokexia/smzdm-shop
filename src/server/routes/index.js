import { resolve } from 'path'
import fs from 'fs'
import Router from 'koa-router'

// 导入api
import genAPI from '../api'

export default function(app) {
    const router = new Router()
    // 初始化 API
    // 初始化 API 一定要放在渲染模板之前
    // API 之外的路由都会转到模板渲染
    genAPI(router)

    // 所有路由都渲染到此模板
    // 以便把路由交给 Vue 管理
    router.get('*', async (ctx, next) => {
        const template = fs.readFileSync(resolve(__dirname, '../views/index.html'), 'utf-8')
        ctx.body = template
    });

    app.use(router.routes())
      .use(router.allowedMethods())
}
