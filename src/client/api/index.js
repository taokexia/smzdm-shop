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
    findByPage: (page=1) => `users/page/${page}`,
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

const tag = {
    findByPage: (page=1) => 'tags/page/${page}',
    add: 'tag/add',
    remove: 'tag/delete',
}

const product = {
    findByPage: (page=1) => `products/page/${page}`,
    findByCate: (cate, page) => `products/category/${cate}/page/${page}`,
    findByTag: (tag, page) => `products/tag/${tag}/page/${page}`,
    findByCollected: (page=1) => `products/collected/page/${page}`,
    findById: id => `product/${id}`,
    add: 'product/add',
    edit: 'product/edit',
    remove: 'product/delete',
    follow: 'product/follow',
    unfollow: 'product/unfollow',
}

// 添加搜索 API
const search = {
    findByPage: (search, page=1) => 'search/${search}/page/${page}'
}
export {
    fetch,
    user,
    category, //导出 API
    tag,
    product,
    search,
}