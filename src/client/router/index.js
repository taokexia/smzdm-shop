import Vue from 'vue'
import VueRouter from 'vue-router'

// 获取组件,webpack会按需加载js代码，提高单页应用性能。
const home = () => import('../pages/home.vue')
const notFound = ()=> import('../pages/notFound.vue')

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history', // 配置使用history模式，使得URL和普通URL一样
    linkActiveClass: 'active',// 指定当前路由与 <router-link> 匹配时给其添加 class 值
    routes: [
        {
            path: '/',
            component: home
        },
        {
            path: '*',
            component: notFound
        }
    ],
    scrollBehavior(to, from, savedPosition) {// 用于控制页面滚动
        if (savedPosition) {
            return savedPosition
        }
        return {x: 0, y: 0} // 每次切换路由后，把页面滚动到最顶端
    }
})

export default router