<template>
    <el-dialog :title="title" :visible.sync="showDialog" :before-close="hide">
        <!-- 传入表单验证规则 rules -->
        <el-form :model="form" :rules="rules" ref="form">
            <!-- prop="name" 表单验证规则的键值 key -->
            <el-form-item label="分类名称" :label-width="formLabelWidth" prop="name">
                <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <!-- prop="url" 表单验证规则的键值 key -->
            <el-form-item label="标签URL" :label-width="formLabelWidth" prop="url">
                <el-input v-model="form.url" auto-complete="off"></el-input>
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
    // 父组件需要传送的 props
    props: {
        title: String,
        showDialog: Boolean,
        model: Object,
    },
    data() {
        return {
            formLabelWidth: '120px',
            // 通过 rules 对表单作验证
            rules: {
                name: [{
                    required: true,
                    message: '请输入分类名称',
                    trigger: 'blur'
                }],
                url: [{
                    required: true,
                    message: '请输入分类URL',
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
        hide() {
            this.$emit('hide')
        },
        async confirm() {
            // 提交表单前验证
            let res = await this.validate()
            if (res) {
                // 通过 $emit 想父组件发送事件
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

