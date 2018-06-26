import axios from 'axios'

// 创建 axios 实例
//每一个 axios 请求都返回一个 Promise
const fetch = axios.create({
    baseURL: '/api/',
    time: 1000,
    withCredentials: true //使请求时提供数据，也就是 cookie
})

// 对应 Koa 中实现的 API 接口地址
const user = {
    getUser: 'user',
    signin: 'signin',
    signup: 'signup',
    logout: 'logout',
}

//根据后台接口，定义 category 的 API
const category = {
    findAll: 'cates',
    add: 'cate/add',
    edit: 'cate/edit',
    remove: 'cate/delete',
}

export {
    fetch,
    user,
    category, //导出 API
}