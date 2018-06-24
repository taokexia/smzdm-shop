import Koa from 'koa'
import { resolve } from 'path'
import serve from 'koa-static'
import mongoose from 'mongoose'
import session from 'koa-session'
import bodyparser from 'koa-bodyparser'
import routes from './routes'

// 在 mongoose 中使用 Node.js 原生的 Promise
// 因为 mongoose 内置 Promise 已不推荐使用
mongoose.Promise = global.Promise
//连接数据库
mongoose.connect('mongodb://localhost:27017/smzdm', {
    useMongoClient: true
})
//绑定 error 事件
mongoose.connection.on('error', console.error.bind(console, 'connect mongodb failed'))

const app = new Koa()

app.keys = ['secretkkk']
app.use(session({
    key: 'smzdm:sess', // cookie 的名称
    maxAGE: 86400000, // session 有效期，单位为毫秒
    overwrite: true, // 是否覆盖已存在的同名 session，为 true 表示覆盖
    httpOnly: true, //是否只能通过 http 获取
    signed: true, // 是否创建签名
    rolling: false, // 若为 true 会强制在每次请求中都为 session 设置标识符 cookie， session 有效期也会重置
}, app))
app.use(bodyparser()) // 使用 bodyparser
// 使用 koa-static 中间件
app.use(serve(resolve(__dirname, '../static')))
routes(app)

app.listen(3000, () => console.log('Server is running at http://localhost:3000'))