<template>
    <layout-component>
        <div slot="body">
            <el-button class="add-btn" type="primary" icon="plus" @click="showAddDialog = true">添加标签</el-button>
            <el-table :data="tags" style="width: 100%">
                <el-table-column prop="name" label="名称" width="150"></el-table-column>
                <el-table-column prop="prettyCreatedAt" label="添加时间" width="150"></el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button type="danger" @click="showRemoveDialog = true; removeForm = scope.row" size="small">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-pagination
                layout="prev, pager, next"
                :page-size="page.limit"
                :total="page.total"
                :current-page="page.page"
                @current-change="getTags"
                >
            </el-pagination>
            <form-component title="添加标签"
                :showDialog="showAddDialog"
                :model="addForm"
                @confirm="add"
                @hide="showAddDialog = false">
            </form-component>
            <el-dialog title="删除标签" :visible.sync="showRemoveDialog">
                <el-alert
                    :title="'确定删除标签：' + removeForm.name + '？'"
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
import form from './forms/tag.vue'
import { fetch, tag } from '../../api'

export default {
    components: {
        'layout-component': layout,
        'form-component': form,
    },
    data() {
        return {
            tags: [],
            page: {
                limit: 10,
                total: 0,
                page: 1,
                pages: 1,
            },
            showAddDialog: false,
            addForm: {
                name: ''
            },
            showRemoveDialog: false,
            removeForm: {},
        }
    },
    head: {
        title: {
            inner: '标签管理'
        }
    },
    methods: {
        // 按分页获取标签
        async getTags(page = 1) {
            let res = await fetch.get(tag.findByPage(page))
            let tags = res.data.tags

            this.tags = tags.docs
            this.page = {
                limit: tags.limit,
                total: tags.total,
                page: tags.page,
                pages: tags.pages,
            }
        },
        // 添加标签
        async add() {
            let res = await fetch.post(tag.add, this.addForm)
            let type = res.data.ok ? 'success' : 'error'

            await this.getTags()
            this.addForm.name = ''
            this.showAddDialog = false
            this.$message({
                message: res.data.msg,
                type
            })
        },
        // 删除标签
        async remove() {
            let res = await fetch.post(tag.remove, this.removeForm)
            let type = res.data.ok ? 'success' : 'error'

            await this.getTags()
            this.showRemoveDialog = false
            this.$message({
                message: res.data.msg,
                type
            })
        }
    },
    mounted() {
        this.getTags()
    }
}
</script>

<style scoped>
.add-btn {
    margin: 10px;
}
</style>