import * as types from '../mutation-types'
import { fetch, user as userUrls } from '../../api'

const state = { //用于存储状态数据
    data: {}
}

const getters = { //可以对 state 中的数据进行一些处理，类似于 Vue 组件中的计算属性。
    currentUser: state => state.data
}
// 定义更改状态数据的方法，必须是同步函数，更改 store 中数据的唯一方法是提交 mutation。
const mutations = {
    // 可以使用 ES6 风格的计算属性命名功能来使用一个常量作为函数
    [types.SIGN_USER](state, { data }) {
        state.data = data
    }
}
//和 mutations 类似，但是 action 是通过提交 mutation 更改数据的.
//action 可以包含异步操作，所以请求 API 是在 action 中完成的而不是 mutation。
const actions = {
    // 获取当前登录的用户
    async getUser({ commit }) {
        let res = await fetch.get(userUrls.getUser)

        commit({
            types: type.SIGN_USER,
            data: res.data
        })
    },
    // 用户登录
    async signin({ commit }, { user }) {
        let res = await fetch.post(userUrls.signin, user)

        commit({
            type: types.SIGN_USER,
            data: res.data
        })
    },
    // 用户注册
    async signup({ commit }, { user }) {
        let res = await fetch.post(userUrls.signup, user)

        commit({
            type: types.SIGN_USER,
            data: res.data
        })
    },
    // 退出登录
    async logout({ commit }) {
        let res = await fetch.get(userUrls.logout)

        commit({
            type: types.SIGN_USER,
            data: {}
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}