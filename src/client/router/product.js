const product = () => import('../pages/product.vue')

export default [{
    path: '/product/:id',
    component: product
}]
