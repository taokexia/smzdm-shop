import { Tag } from '../models'
import auth from '../routes/auth'

export default function(router) {
    //根据分页获取标签
    router.get('/api/tags/page/:page', async (ctx, next) => {
        let page = parseInt(ctx.params.page)
        ctx.body = await Tag.findByPage(page)
    })

    // 添加标签
    router.use('/api/tag/add', auth)
    router.post('/api/tag/add', async (ctx, next) => {
        let { name } = ctx.request.body
        let tag = new Tag({ name })
        ctx.body = await Tag.save(tag)
    })

    // 删除标签
    router.use('/api/tag/delete', auth)
    router.post('/api/tag/delete', async (ctx, next) => {
        let { name } = ctx.request.body
        ctx.body = await Tag.remove(name)
    })
}