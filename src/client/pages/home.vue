<template>
    <layout-component>
        <div slot="body">
            <!-- 渲染商品列表 -->
            <list-component :products="products">
                <div slot="header" class="list-title">
                    <span>精选</span>
                </div>
            </list-component>
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
import { fetch, product } from  '../api'

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
            products: [],
        }
    },
    head: {
        title: { //用于VueHead组件
            inner: '首页'
        }
    },
    computed: {
        // 获取当前页的页码
        currentPage() {
            return this.$route.params.page || 1
        }
    },
    watch: {
        currentPage() {
            this.getProducts()
        }
    },
    methods: {
        // 按分页获取商品
        async getProducts() {
            let res = await fetch.get(product.findByPage(this.currentPage))
            if (res.data.ok) {
                this.total = res.data.products.total
                this.page = res.data.products.page
                this.pages = res.data.products.pages
                this.products = res.data.products.docs
            }
        }
    },
    mounted() {
        this.getProducts()
    }
}
</script>

<style>
.list-title {
    margin: 15px;
    margin-left: 0;
    padding-left: 15px;
    color: #333;
    font-size: 20px;
    border-left: 2px solid #f04848;
}
</style>
