<template>
    <layout-component>
        <div slot="body">
            <list-component :products="products">
            </list-component>
            <pagination-component
                v-if="pages > 1"
                :query="keyword"
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
import { fetch, search } from '../api'

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
        title: {
            inner: '搜索'
        }
    },
    computed: {
        // 获取搜索关键词
        keyword() {
            return this.$route.query.search || ''
        },
        // 获取当前页数
        currentPage() {
            return this.$route.params.page || 1
        },
    },
    watch: {
        // 关键字改变是重现获取商品
        keyword() {
            this.getProducts()
        },
        // 页数改变时重现获取商品
        currentPage() {
            this.getProducts()
        }
    },
    methods: {
        // 通过关键字搜索商品
        async getProducts() {
            let res = await fetch.get(search.findByPage(this.keyword, this.currentPage))
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