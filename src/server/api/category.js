import { Category } from '../models'
import auth from '../routes/auth'

export default function(router) {
    // 获取所有分类
    router.get('/api/cates', async (ctx, next) => {
        ctx.body = await Category.findAll()
    })

    // 根据 ID 获取分类
    router.get('/api/cate/:id', async (ctx, next) => {
        let id = ctx.params.id
        ctx.body = await Category.findById(id)
    })

    // 添加一个分类
    router.use('/api/cate/add', auth)
    router.post('/api/cate/add', async (ctx, next) => {
        let {
            name,
            url
        } = ctx.request.body

        let cate = new Category({
            name,
            url
        })
        ctx.body = await Category.save(cate)
    })

    // 修改一个分类
    router.use('/api/cate/edit', auth)
    router.post('/api/cate/edit', async (ctx, next) => {
        let {
            _id,
            name,
            url
        } = ctx.request.body

        let cate = {
            _id,
            name,
            url
        }
        ctx.body = await Category.update(cate)
    })

    //删除一个分类
    router.use('/api/cate/delete', auth)
    router.post('/api/cate/delete', async (ctx, next) => {
        let {
            _id
        } = ctx.request.body

        ctx.body = await Category.remove(_id)
    })
}