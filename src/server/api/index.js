import user from './user'
import cate from './category'
import tag from './tag'
import product from './product'

export default function(router) {
    user(router)
    cate(router)
    product(router)
    tag(router)
}