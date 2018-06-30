import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate'
import marked from 'marked'
import moment from 'moment'
import { save, update, remove, findByPage, findById } from './utils'

moment.locale('zh-cn')

// marked 配置项
marked.Lexer.rules.gfm.heading = marked.Lexer.rules.normal.heading
marked.Lexer.rules.tables.heading = marked.Lexer.rules.normal.heading

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },// 商品名称
    category: { type: Object, required: true},// 商品分类
    price: { type: Number, required: true },// 商品价格
    details: String,// 商品详情
    img: String,// 商品图片
    link: String,// 商品原始链接
    tags: { type: Array, default: [] },// 商品标签
    collectedUsers: { type: Array, default: [] },// 收藏商品用户
    createdAt: { type: Date, default: Date.now },// 添加时间
}, {
    toJSON: {
        virtuals: true
    }
})

// 使用分页插件
productSchema.plugin(mongoosePaginate)

// 商品分类名称
productSchema.virtual('cateName').get(function() {
    return this.category.name
})

// 通过 marked 将商品详情转换为 html 字符
productSchema.virtual('markedDetails').get(function() {
    if (this.details) {
        return marked(this.details)
    } else {
        return ''
    }
})

// 美化商品创建时间
productSchema.virtual('prettyCreatedAt').get(function() {
    return moment(this.createdAt).format('ll')
})

// 添加商品
productSchema.statics.save = async function(product) {
    return await save(product)
}

// 更新商品
productSchema.statics.update = async function(product) {
    return await update(this, product)
}

// 删除商品
productSchema.statics.remove = async function(id) {
    return await remove(this, id)
}

// 按分页查询商品
productSchema.statics.findByPage = async function(page = 1) {
    return await findByPage(this, {}, page, 'products')
}

// 按分类查询商品
productSchema.statics.findByCategory = async function(category, page = 1) {
    return await findByPage(this, { 'category.url': category }, page, 'products')
}

// 按标签查询商品
productSchema.statics.findByTag = async function(tag, page = 1) {
    return await findByPage(this, { tags: { $in: [tag] }}, page, 'products')
}

// 通过 id 查询商品
productSchema.statics.findById = async function(id) {
    return await findById(this, id, 'product')
}

productSchema.statics.findBySearch = async function(search, page = 1) {
    return await fundByPage(this, { name: new RegExp(search, 'gim')}, page, 'products')
}

const Product = mongoose.model('Product', productSchema)

export { Product }