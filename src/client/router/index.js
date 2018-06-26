import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'
import admin from './admin'

// 获取组件,webpack会按需加载js代码，提高单页应用性能。
const home = () => import('../pages/home.vue')
const notFound = () => import('../pages/notFound.vue')

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history', // 配置使用history模式，使得URL和普通URL一样
    linkActiveClass: 'active',// 指定当前路由与 <router-link> 匹配时给其添加 class 值
    routes: [
        {
            path: '/',
            component: home
        },
        // 添加 admin 路由
        ...admin,
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

router.beforeEach(async (to, from, next) => {
    await store.dispatch({ type: 'getUser' })

    let data = store.state.user.data
    let logedIn = false
    let user = {}
    if (data) {
        logedIn = data.ok
        user = data.user
    }
    
    if (to.matched.some(record => record.meta.requiresLogin)) {
        // 对于需要登录才能访问的页面
        // 判断是否登录， 未登录跳转首页
        if (!logedIn) {
            next({
                path: '/'
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.requiresAdmin)) {
        // 对于只有管理员才能访问的页面
        // 判断是否是管理员， 不是跳转首页
        if (logedIn && user.isAdmin) {
            next()
        } else {
            next({
                path: '/'
            })
        }
    } else {
        next()
    }
})
export default router