const search = () => import('../pages/search.vue')

export default [{
    path: '/search',
    component: search
}, {
    path: '/search/page/:page',
    component: search
}]