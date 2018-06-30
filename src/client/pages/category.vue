<template>
    <layout-component>
        <div slot="body">
            <!-- 渲染商品列表 -->
            <list-component :products="products"></list-component>
            <!-- 渲染分页组件 -->
            <pagination-component
                v-if="pages > 1"
                :total="total"
                :page="page"
                :pages="pages"
                ></pagination-component>
        </div>
    </layout-component>
</template>

<script>
import layout from '../components/layout.vue'
import list from '../components/list.vue'
import pagination from '../components/pagination.vue'
import { fetch, product } from '../api'

export default {
    components: {
        'layout-component': layout,
        'list-component': list,
        'pagination-component': pagination,
    },
    data() {
        return {
            total: 0,
            page: 1,
            pages: 1,
            cateName: '',
            products: [],
        }
    },
    head: {
        title() {
            return {
                inner: this.cateName
            }
        }
    },
    computed: {
        // 获取当前分类
        category() {
            return this.$route.params.cate
        },
        // 获取当前页码
        currentPage() {
            return this.$route.params.page || 1
        }
    },
    watch: {
        async category() {
            await this.getProducts()
            this.updateTitle()
        },
        currentPage() {
            this.getProducts()
        }
    },
    methods: {
        // 获取商品
        async getProducts() {
            let res = await fetch.get(product.findByCate(this.category, this.currentPage))
            if (res.data.ok) {
                this.total = res.data.products.total
                this.page = res.data.products.page
                this.pages = res.data.products.pages
                this.products = res.data.products.docs
            }
        },
        // 更新页面标题
        updateTitle() {
            if (this.products.length) {
                this.cateName = this.products[0].category.name
                this.$emit('updateHead')
            }
        }
    },
    async mounted() {
        await this.getProducts()
        this.updateTitle()
    }
}
</script>