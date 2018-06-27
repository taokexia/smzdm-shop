import user from './user'
import cate from './category'
import tag from './tag'

export default function(router) {
    user(router)
    cate(router)
    tag(router)
}