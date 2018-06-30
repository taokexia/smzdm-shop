import { Product } from '../models'

export default function(router) {
    router.get('/api/search/:search/page/:page', async (ctx, next) => {
        let search = ctx.params.search
        let page = parseInt(ctx.params.page)

        ctx.body = await Product.findBySearch(search, page)
    })
}