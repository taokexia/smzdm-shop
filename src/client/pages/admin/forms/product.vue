<template>
    <el-dialog :title="title" :visible.sync="showDialog" :before-close="hide">
        <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="商品名称" :label-width="formLabelWidth" prop="name">
                <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" :label-width="formLabelWidth" prop="category">
                <el-select v-model="form.category" value-key="_id">
                    <!-- 循环渲染所有分类 -->
                    <el-option
                        v-for="cate in categories"
                        :key="cate._id"
                        :label="cate.name"
                        :value="cate">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品价格" :label-width="formLabelWidth" prop="price">
                <el-input v-model.number="form.price" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品图片" :label-width="formLabelWidth">
                <el-input v-model.number="form.img" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品链接" :label-width="formLabelWidth">
                <el-input v-model.number="form.link" auto-complete="off"></el-input>
            </el-form-item>
            <!-- 通过 addTag 方法添加新标签 -->
            <el-form-item label="标签" :label-width="formLabelWidth">
                <el-input v-model="newTag" auto-complete="off" @keyup.enter.native="addTag"></el-input>
                <el-tag
                    v-for="(tag, index) in tags"
                    class="tag"
                    :key="tag"
                    :closable="true"
                    type="primary"
                    @close="removeTag(index)">{{ tag }}</el-tag>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="hide">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { fetch, category } from '../../../api'

export default {
    props: {
        title: String,
        showDialog: Boolean,
        cates: Array,
        model: {
            name: String,
            category: String,
            price: Number,
            img: String,
            link: String,
            tags: Array,
        },
    },
    data() {
        return {
            formLabelWidth: '120px',
            newTag: '',
            tags: [],
            rules: {
                name: [{
                    required: true,
                    message: '请输入商品名称',
                    trigger: 'blur'
                }],
                category: [{
                    type: 'object',
                    required: true,
                    message: '请选择商品分类',
                    trigger: 'blur'
                }],
                price: [{
                    type: 'number',
                    required: true,
                    message: '请输入商品价格',
                    trigger: 'blur'
                }]
            }
        }
    },
    computed: {
        categories() {
            return this.cates
        },
        form() {
            if (this.model && this.model.tags) {
                this.tags = [...this.model.tags]
            }
            return this.model
        }
    },
    methods: {
        // 隐藏对话框
        hide() {
            this.$emit('hide')
        },
        // 验证表单
        validate() {
            return new Promise((resolve, reject) => {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        resolve(true)
                    } else {
                        reject(false)
                    }
                })
            })
        },
        // 确认添加/编辑商品
        async confirm() {
            let res = await this.validate()
            if (res) {
                this.form.tags = this.tags
                this.$emit('confirm', this.form)
                this.tags = []
            }
        },
        // 添加标签
        addTag() {
            if (this.newTag.length) {
                this.tags.push(this.newTag)
                this.newTag = ''
            }
        },
        // 删除标签
        removeTag(index) {
            this.tags.splice(index, 1)
        }
    },
}
</script>

<style scoped>
.tag {
    margin-right: 10px;
}
</style>

