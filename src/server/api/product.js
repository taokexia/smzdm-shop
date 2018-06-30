import _ from 'lodash'
import { Product } from '../models'
import auth from '../routes/auth'

export default function(router) {
    //按分页查询商品
    router.get('/api/products/page/:page',async(ctx, next) => {
        let page = parseInt(ctx.params.page)
        ctx.body = await Product.findByPage(page)
    })

    // 按分类查询商品
    router.get('/api/products/category/:cate/page/:page', async (ctx, next) => {
        let cate = ctx.params.cate
        let page = parseInt(ctx.params.page)
        ctx.body = await Product.findByCategory(cate, page)
    })

    // 按标签查询商品
    router.get('/api/products/tag/:tag/page/:page', async (ctx, next) => {
        let tag = ctx.params.tag
        let page = parseInt(ctx.params.page)
        ctx.body = await Product.findByTag(tag, page)
    })

    // 查询某个用户收藏的商品
    router.get('/api/products/collected/page/:page', async (ctx, next) => {
        let page = parseInt(ctx.params.page)
        ctx.body = await Product.findByCollectedUser(ctx.session.user, page)
    })

    // 按 id 查询商品
    router.get('/api/product/:id', async (ctx, next) => {
        let id =  ctx.params.id
        ctx.body = await Product.findById(id)
    })

    // 添加商品
    router.use('/api/product/add', auth)
    router.post('/api/product/add', async (ctx, next) => {
        let {
            name,
            category,
            price,
            details,
            img,
            link,
            tags
        } = ctx.request.body

        let product = new Product({
            name,
            category,
            price,
            details,
            img,
            link,
            tags
        })

        ctx.body = await Product.save(product)
    })

    // 更新商品
    router.use('/api/product/edit', auth)
    router.post('/api/product/edit', async (ctx, next) => {
        let {
            _id,
            name,
            category,
            price,
            details,
            img,
            link,
            tags
        } = ctx.request.body

        let product = {
            _id,
            name,
            category,
            price,
            details,
            img,
            link,
            tags
        }

        ctx.body = await Product.update(product)
    })

    // 删除商品
    router.use('/api/product/delete', auth)
    router.post('/api/product/delete', async (ctx, next) => {
        let { _id } = ctx.request.body
        ctx.body = await Product.remove(_id)
    })

    router.use('/api/product/follow', auth)
    router.post('/api/product/follow', async (ctx, next) => {
        let { _id } = ctx.request.body
        let userId = ctx.session.user._id
        let res = await Product.findById(_id)
        let product = res.product

        if (product.collectedUsers.indexOf(userId) > -1) {
            ctx.body = { ok: false, msg: '已收藏' }
        } else {
            product.collectedUsers.push(userId)

            let p = {
                _id: product._id,
                collectedUsers: product.collectedUsers,
            }
            ctx.body = await Product.update(p)
        }
    })

    router.use('/api/product/unfollow', auth)
    router.post('/api/product/unfollow', async (ctx, next) => {
        let { _id } = ctx.request.body
        let userId = ctx.session.user._id
        let res = await Product.findById(_id)
        let product = res.product

        _.remove(product.collectedUsers, function(id) {
            return id == userId
        })
        let p = {
            _id: product._id,
            collectedUsers: product.collectedUsers,
        }
        ctx.body = await Product.update(p)
    })
}