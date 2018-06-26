import * as types from '../mutation-types'
import { fetch, category as cateUrls } from '../../api'

const state = {
    data: {}
}

const getters = {
    cates: state => state.data
}

const mutations = {
    // 更新 state 数据
    [types.GET_CATES](state, { data }) {
        state.data = data
    }
}

const actions = {
    // 获取所有分类
    // 只定义获取分类的 mutation,没有定义添加分类、修改分类及删除分类的 mutation
    // 因为每次分类修改都会提交到服务器保存到数据库
    // 所有只需要每次增删改操作之后重新从服务器获取一次所有分类即可。
    async getCates({ commit }) {
        let res = await fetch.get(cateUrls.findAll)

        commit({
            type: types.GET_CATES,
            data: res.data
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}