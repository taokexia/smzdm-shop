<template>
    <layout-component>
        <div slot="body">
            <list-component :products="products"></list-component>
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
            products: [],
        }
    },
    head: {
        title() {
            return {
                inner: this.tag
            }
        }
    },
    computed: {
        // 获取当前标签
        tag() {
            return this.$route.params.tag
        },
        // 获取当前页码
        currentPage() {
            return this.$route.params.page || 1
        }
    },
    watch: {
        tag() {
            this.$emit('updateHead')
            this.getProducts()
        },
        currentPage() {
            this.getProducts()
        }
    },
    methods: {
        // 获取商品
        async getProducts() {
            let res = await fetch.get(product.findByTag(this.tag, this.currentPage))
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