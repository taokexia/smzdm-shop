import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'

Vue.use(Vuex)

// 创建 store 实例
export default new Vuex.Store({
    modules: {
        user,
    }
})