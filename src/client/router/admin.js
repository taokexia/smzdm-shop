const category = () => import('../pages/admin/category.vue')

export default [{
    path: '/admin/categories',
    component: category,
    meta: { requiresAdmin: true} //标志只有 admin 才能访问此路由
}]