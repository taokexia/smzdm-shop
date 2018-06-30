<template>
    <layout-component>
        <div slot="body">
            <el-button class="add-btn" type="primary" icon="plus" @click="showAddDialog = true">添加商品</el-button>
            <el-table :data="products" style="width: 100%">
                <el-table-column label="图片" width="150px">
                    <template scope="scope">
                        <img :src="scope.row.img" style="width:100px; height:100px;">
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="名称" width="150"></el-table-column>
                <el-table-column prop="category.name" label="分类" width="100"></el-table-column>
                <el-table-column prop="price" label="价格(￥)" width="100"></el-table-column>
                <el-table-column label="链接" width="100px">
                    <template scope="scope">
                        <el-button type="primary" size="small">
                            <a :href="scope.row.link" target="_blank" style="color:#fff;">链接</a>
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column label="标签" width="150px">
                    <template scope="scope">
                        <el-tag v-for="tag in scope.row.tags"
                            class="tag"
                            :key="tag"
                            type="primary"
                            >{{ tag }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="prettyCreatedAt" label="添加时间" width="150"></el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button type="primary" @click="showEditDialog = true; editForm = scope.row" size="small">
                            编辑
                        </el-button>
                        <el-button type="primary" @click="showDetailsDialog = true; detailsForm = scope.row" size="small">
                            编辑详情
                        </el-button>
                        <el-button type="danger" @click="showRemoveDialog = true; removeForm = scope.row" size="small">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                layout="prev, pager, next"
                :page-size="page.limit"
                :total="page.total"
                :current-page="page.page"
                @current-change="getProducts"
                >
            </el-pagination>
            <form-component title="添加商品"
                :cates="cates"
                :showDialog="showAddDialog"
                :model="addForm"
                @confirm="add"
                @hide="showAddDialog = false">
            </form-component>
            <form-component title="编辑商品"
                :cates="cates"
                :showDialog="showEditDialog"
                :model="editForm"
                @confirm="edit"
                @hide="showEditDialog = false">
            </form-component>
            <!-- 编辑商品详情的表单组件 -->
            <el-dialog title="编辑商品详情" :visible.sync="showDetailsDialog">
                <el-input
                    type="textarea"
                    :rows="20"
                    placeholder="请输入商品详情，支持 markdown 语法格式"
                    v-model="detailsForm.details">
                </el-input>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="showDetailsDialog = false">取 消</el-button>
                    <el-button type="primary" @click="edit(detailsForm)">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 删除商品的表单组件 -->
            <el-dialog title="删除商品" :visible.sync="showRemoveDialog">
                <el-alert
                    :title="'确定删除商品：' + removeForm.name + '？'"
                    type="error"
                    :closable="false">
                </el-alert>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="showRemoveDialog = false">取 消</el-button>
                    <el-button type="primary" @click="remove">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </layout-component>
</template>

<script>
import layout from '../../components/admin/layout.vue'
import form from './forms/product.vue'
import { fetch, category, product, tag } from '../../api'

export default {
    components: {
        'layout-component': layout,
        'form-component': form,
    },
    data() {
        return {
            cates: [],
            products: [],
            page: {
                limit: 10,
                total: 0,
                page: 1,
                pages: 1,
            },
            showAddDialog: false,
            addForm: {
                name: '',
                category: '',
                price: 0,
                tags: [],
            },
            showEditDialog: false,
            editForm: {
                name: '',
                category: '',
                price: 0,
                tags: [],
            },
            showRemoveDialog: false,
            removeForm: {},
            showDetailsDialog: false,
            detailsForm: {},
        }
    },
    head: {
        title: {
            inner: '商品管理'
        }
    },
    methods: {
        // 获取分类
        async getCates() {
            let res = await fetch.get(category.findAll)
            this.cates = res.data.cates
        },
        // 按分页获取商品
        async getProducts(page = 1) {
            let res = await fetch.get(product.findByPage(page))
            let products = res.data.products
            this.products = products.docs
            this.page = {
                limit: products.limit,
                total: products.total,
                page: products.page,
                pages: products.pages,
            }
        },
        // 添加商品时，保存其标签到数据库
        async addTag(name) {
            return await fetch.post(tag.add, { name })
        },
        // 添加商品
        async add(form) {
            let res = await fetch.post(product.add, form)
            let type = res.data.ok ? 'success' : 'error'
            // save tags
            let arr = form.tags.map(tag => this.addTag(tag))
            await Promise.all(arr)
            await this.getProducts()
            this.showAddDialog = false
            this.addForm = {}
            this.$message({
                message: res.data.msg,
                type
            })
        },
        // 编辑商品
        async edit(form) {
            let res = await fetch.post(product.edit, form)
            let type = res.data.ok ? 'success' : 'error'
            // save tags
            let arr = form.tags.map(tag => this.addTag(tag))
            await Promise.all(arr)
            await this.getProducts()
            this.showEditDialog = false
            this.showDetailsDialog = false
            this.$message({
                message: res.data.msg,
                type
            })
        },
        // 删除商品
        async remove() {
            let res = await fetch.post(product.remove, this.removeForm)
            let type = res.data.ok ? 'success' : 'error'
            await this.getProducts()
            this.showRemoveDialog = false
            this.$message({
                message: res.data.msg,
                type
            })
        },
    },
    mounted() {
        this.getCates()
        this.getProducts()
    }
}
</script>

<style scoped>
.add-btn {
    margin: 10px;
}
.tag {
    margin-right: 10px;
}
</style>