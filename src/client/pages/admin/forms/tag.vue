<template>
    <el-dialog :title="title" :visible.sync="showDialog" :before-close="hide">
        <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="标签名称" :label-width="formLabelWidth" prop="name">
                <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="hide">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    props: {
        title: String,
        showDialog: Boolean,
        model: Object,
    },
    data() {
        return {
            formLabelWidth: '120px',
            rules: {
                name: [{
                    required: true,
                    message: '请输入分类名称',
                    trigger: 'blur'
                }]
            }
        }
    },
    computed: {
        form() {
            return this.model
        }
    },
    methods: {
        // 触发隐藏对话框事件
        hide() {
            this.$emit('hide')
        },
        // 触发添加标签事件
        async confirm() {
            let res = await this.validate()
            if (res) {
                this.$emit('confirm')
            }
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
        }
    }
}
</script>