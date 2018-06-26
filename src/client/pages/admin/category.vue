<template>
    <layout-component>
        <div slot="body">
            <el-button class="add-btn" type="primary" icon="plus" @click="showAddDialog = true">添加分类</el-button>
            <!-- el-table 会自动循环出传给 data 的数组中的数据 -->
            <el-table :data="cates" style="width: 100%">
                <el-table-column prop="name" label="名称" width="150"></el-table-column>
                <el-table-column prop="url" label="url" width="150"></el-table-column>
                <el-table-column prop="prettyCreatedAt" label="添加时间" width="150"></el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button type="primary" @click="showEditDialog = true; editForm = scope.row" size="small">
                            编辑
                        </el-button>
                        <el-button type="danger" @click="showRemoveDialog = true; removeForm = scope.row" size="small">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 这是添加分类的对话框表单 -->
            <form-component title="添加分类"
                :showDialog="showAddDialog"
                :model="addForm"
                @confirm="add"
                @hide="showAddDialog = false">
            </form-component>
            <!-- 这是修改分类的对话框表单 -->
            <form-component title="编辑分类"
                :showDialog="showEditDialog"
                :model="editForm"
                @confirm="edit"
                @hide="showEditDialog = false">
            </form-component>
            <!-- 这是删除分类的对话框 -->
            <el-dialog title="删除分类" :visible.sync="showRemoveDialog">
                <el-alert
                    :title="'确定删除分类：' + removeForm.name + '？'"
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
import form from './forms/category.vue'
import { fetch, category } from '../../api'

export default {
    // 引入组件
    components: {
        'layout-component': layout,
        'form-component': form,
    },
    data() {
        return {
            cates: [],
            showAddDialog: false,
            addForm: {
                name: '',
                url: '',
            },
            showEditDialog: false,
            editForm: {},
            showRemoveDialog: false,
            removeForm: {},
        }
    },
    // 设置页面标题
    head: {
        title: {
            inner: '分类管理'
        }
    },
    methods: {
        // 获取所有分类
        async getAll() {
            let res = await fetch.get(category.findAll)
            this.cates = res.data.cates
        },
        // 添加分类
        async add() {
            let res = await fetch.post(category.add, this.addForm)
            let type = res.data.ok ? 'success' : 'error'

            await this.getAll()
            this.showAddDialog = false
            this.addForm = {}
            this.$message({
                message: res.data.msg,
                type
            })
        },
        // 修改分类
        async edit() {
            let res = await fetch.post(category.edit, this.editForm)
            let type = res.data.ok ? 'success' : 'error'

            await this.getAll()
            this.showEditDialog = false
            this.$message({
                message: res.data.msg,
                type
            })
        },
        // 删除分类
        async remove() {
            let res = await fetch.post(category.remove, this.removeForm)
            let type = res.data.ok ? 'success' : 'error'

            await this.getAll()
            this.showRemoveDialog = false
            this.$message({
                message: res.data.msg,
                type
            })
        }
    },
    mounted() {
        // 组件挂载后自动获取所有分类
        this.getAll()
    }
}
</script>

<style scoped>
.add-btn {
    margin: 10px;
}
</style>