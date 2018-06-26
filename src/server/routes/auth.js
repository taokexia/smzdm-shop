export default async function (ctx, next) {
    if (ctx.session.user) {
        return next()
    } else {
        return ctx.body = { ok: false, msg: '请登录'}
    }
}