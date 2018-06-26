import { User } from '../models'

// 通过 koa-router 创建 api 路由
// 返回的数据均为 json
export default function (router) {
    // 登录
    router.post('/api/signin', async (ctx, next) => {
        // 解析 request body 中的参数
        let {
            email,
            password
        } = ctx.request.body

        ctx.body = await User.login(ctx, email, password)
    });

    // 注册
    router.post('/api/signup', async (ctx, next) => {
        let {
            username,
            email,
            password,
            repassword
        } = ctx.request.body

        if (password !== repassword) {
            ctx.body = { ok: false, msg: '两次密码不一样'};
        } else {
            let user = new User({
                username,
                email,
                password,
            })
            ctx.body = await User.add(ctx, user)
        }
    })

    //获取当前登录用户
    router.get('/api/user', async (ctx, next) => {
        if (ctx.session.user) {
            console.log(ctx.session.user)
            ctx.body = { ok: true, msg: '已登录', user: ctx.session.user }
        } else {
            ctx.body = { ok: false, msg: '未登录' }
        }
    })

    // 退出登录
    router.get('/api/logout', (ctx, next) => {
        //删除用户的 session 即可退出登录
        delete ctx.session.user
        ctx.body = { ok: true, msg: '退出成功' }
    })
}