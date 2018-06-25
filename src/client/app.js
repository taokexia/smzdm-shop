import 'babel-polyfill' //用于实现浏览器不支持原生功能的代码
import Vue from 'vue'
// VueHead 组件用于设置每个路由页面的title
import VueHead from 'vue-head' 

// 获取组件
import App from './components/app.vue'
// 注册 modal 组件
import modal from './components/modal.vue'
// 引入 router
import router from './router'
import store from './store'

Vue.use(VueHead)
// 注册 modal 组件
Vue.component('modal', modal)

// 创建 vue 实例,并渲染组件
const app = new Vue({
    el: '#app',
    store, // 传入 store 给 Vue app
    router, // 传入 router 给 Vue app
    render: h => h(App)
});