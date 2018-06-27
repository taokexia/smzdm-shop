import mongoose from 'mongoose'
import moment from 'moment'
import mongoosePaginate from 'mongoose-paginate'
import { save, remove, findByPage } from './utils'

moment.locale('zh-cn')

// 定义 tag schema
const tagSchema  = new mongoose.Schema({
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}, {
    toJSON: {
        virtuals: true
    }
})

// 使用分页插件
tagSchema.plugin(mongoosePaginate)

// 添加标签
tagSchema.statics.save = async function(tag) {
    let document_1 = await this.findOne({ name: tag.name })
    if (document_1) {
        return { ok: false, msg: '此标签已存在' }
    }

    return await save(tag)
}

// 删除标签
tagSchema.statics.remove = async function(name) {
    try {
        let tag = await this.findOne({ name })
        return await remove(this, tag._id)
    } catch (err) {
        return { ok: false, msg: '此标签不存在' }
    }
}

// 按分页查询标签
tagSchema.statics.findByPage = async function(page = 1) {
    return await findByPage(this, {}, page, 'tags')
}

const Tag = mongoose.model('Tag', tagSchema)

export { Tag }