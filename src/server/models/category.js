import mongoose from 'mongoose'
import moment from 'moment'
import { save, update, remove, findAll, findById } from './utils'

moment.locale('zh-cn')

// 创建分类 schema
const cateSchema = new mongoose.Schema({
    name: { type: String, required: true},
    url: { type: String, required: true},
    createdAt: { type: Date, default: Date.now }
}, {
    toJSON: {
        virtuals: true
    }
})

cateSchema.virtual('prettyCreatedAt').get(function() {
    return moment(this.createdAt).format('ll')
})

// 添加分类
cateSchema.static.save = async function(cate) {
    // 查找是否存在相同名称的分类
    let document_1 = await this.findOne({ name: cate.name })
    if (document_1) { 
        return { ok: false, msg: '存在相同名称的分类', cate: document_1 }
    }

    // 查找是否存在相同 url 的分类
    let document_2 = await this.findOne({ url: cate.url})
    if (document_2) {
        return { ok: false, msg: '存在相同url的分类', cate: document_2}
    }

    return await save(cate)
}

// 修改分类
cateSchema.statics.update = async function(cate) {
    return await update(this, cate)
}

// 删除分类
cateSchema.statics.remove = async function(id) {
    return await remove(this, id)
}

// 查找所有分类
// 商品分类不需要分页查找
cateSchema.statics.findAll = async function() {
    return await findAll(this, 'cates')
}

// 根据 _id 查找分类
cateSchema.statics.findById = async function(id) {
    return await findById(this, id, 'category')
}

// 创建分类 model
const Category = mongoose.model('Category', cateSchema)

export { Category, cateSchema }