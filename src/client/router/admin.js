const category = () => import('../pages/admin/category.vue')
const tag = () => import('../pages/admin/tag.vue')
const product = () => import('../pages/admin/product.vue')

export default [{
    path: '/admin/categories',
    component: category,
    meta: { requiresAdmin: true} //标志只有 admin 才能访问此路由
}, {
    path: '/admin/tags',
    component: tag,
    meta: { requiresAdmin: true}
}, {
    path: '/admin/products',
    component: product,
    meta: { requiresAdmin: true}
}]