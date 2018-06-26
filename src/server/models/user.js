import mongoose from 'mongoose'
import moment from 'moment'
import { md5 } from '../utils'

moment.locale('zh-cn')

// 创建 user schema
const userSchema = new mongoose.Schema({
    // type 表示值的类型, String 为字符串
    // required 表示值是否为必须, true 表示不为空
    // default 表示默认值
    username: { type: String, required: true },
    email: { type: String, required: true},
    password: { type: String, required: true},
    isAdmin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
}, {
    toJSON: {
        virtuals: true
    }
})

// 使用 moment 格式化注册时间
userSchema.virtual('prettyCreatedAt').get(function() {
    return moment(this.createdAt).format('ll')
})

// 通过 statics 给 model 添加静态方法
// 用户注册
userSchema.statics.add = async function(ctx, user) {
    let document_1 = await this.findOne({ email: user.email })
    if (document_1) {
        return { ok: false, msg: '此邮箱已注册' }
    }
    let document_2 = await this.findOne({ username: user.username })
    if (document_2) {
        return { ok: false, msg: '此用户名已存在'}
    }

    user.password = md5(user.password)
    await user.save()
    if (ctx) {
        // 用户注册成功后添加到 session
        // 是用户注册后自动登录
        // 在 session 中不保存用户的密码
        user.password = null
        ctx.session.user = user
    } 

    return { ok: true, msg: '注册成功', user}
}

// 用户登录
userSchema.statics.login = async function(ctx, email, password) {
    let user = await this.findOne({ email })

    if (user) {
        if (md5(password) === user.password) {
            user.password = null
            ctx.session.user = user
            console.log(ctx.session.user)
            return { ok: true, msg: '登录成功', user}
        }
        return { ok: false, msg: '密码错误'}
    }
    return { ok: false, msg: '邮箱未注册'}
}

let User = mongoose.model('User', userSchema);

// 添加 admin 用户
// 邮箱: admin@taokexia.com
// 密码: admin
// 添加默认管理员
User.findOne({ isAdmin: true }).then(user => {
    // 如果已经存在管理员则不再添加
    if (user) {
        return false
    }
    const admin = new User({
        username: 'admin',
        email: 'admin@taokexia.com',
        password: md5('admin'),
        isAdmin: true,
    })
    admin.save()
})

export { User }