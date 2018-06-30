const category = () => import('../pages/category.vue')

export default [{
    path: '/category/:cate',
    component: category
}, {
    path: '/category/:cate/page/:page',
    component: category
}]