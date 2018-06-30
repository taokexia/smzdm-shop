
<template>
    <nav v-if="pages > 1">
        <ul class="pagination">
            <li :class="{ disabled: !hasPrev }">
                <router-link v-if="hasPrev"
                    :to="query ? `${urlPrefix}${page-1}?search=${query}` : `${urlPrefix}${page-1}`"
                    aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </router-link>
                <a v-else aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li v-if="page > 7"><router-link
                    :to="query ? `${urlPrefix}1?search=${query}` : `${urlPrefix}1`"
                    >1</router-link></li>
            <li v-if="page > 7"><a>...</a></li>

            <li v-if="prevPages.length" v-for="p in prevPages"><router-link
                    :to="query ? `${urlPrefix}${p}?search=${query}` : `${urlPrefix}${p}`"
                    >{{ p }}</router-link></li>
            <li class="active"><router-link
                    :to="query ? `${urlPrefix}${page}?search=${query}` : `${urlPrefix}${page}`"
                    >{{ page }}</router-link></li>
            <li v-if="nextPages.length" v-for="p in nextPages"><router-link
                    :to="query ? `${urlPrefix}${p}?search=${query}` : `${urlPrefix}${p}`"
                    >{{ p }}</router-link></li>

            <li v-if="pages - page > 6"><a>...</a></li>
            <li v-if="page - page > 6"><router-link
                    :to="query ? `${urlPrefix}${pages}?search=${query}` : `${urlPrefix}${pages}`"
                    >{{ pages }}</router-link></li>
            <li :class="{ disabled: !hasNext }">
                <router-link v-if="hasNext"
                    :to="query ? `${urlPrefix}${pages}?search=${query}` : `${urlPrefix}${pages}`"
                    aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </router-link>
                <a v-else aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
import { range } from 'lodash'
export default {
    props: {
        // URL 前缀
        prefix: String,
        // 商品搜索的关键字，后面实现商品搜索时会用到
        query: String,
        total: Number,
        page: Number,
        pages: Number,
    },
    data() {
        return {
            urlPrefix: this.prefix + 'page/',
            hasPrev: false,
            hasNext: false,
            prevPages: [],
            nextPages: [],
        }
    },
    watch: {
        page() {
            this.init()
        }
    },
    methods: {
        init() {
            // 判断是否为第一页
            if (this.page === 1) {
                this.hasPrev = false
            } else {
                this.hasPrev = true
            }
            // 判断是否为最后一页
            if (this.page === this.pages) {
                this.hasNext = false
            } else {
                this.hasNext = true
            }
            let pathname = window.location.pathname
            if (/\/$/.test(pathname)) {
                pathname = pathname.slice(0, -1)
            }
            if (/page/.test(pathname)) {
                this.urlPrefix = window.location.pathname.replace(/\d+$/, '')
            } else {
                this.urlPrefix = pathname + '/page/'
            }
            // 生成当前页的前置页数
            this.prevPages = range(Math.max(1, this.page - 5), this.page)
            // 生成当前页的后置页数
            this.nextPages = range(this.page + 1, Math.min(this.pages + 1, this.page + 6))
        }
    },
    mounted() {
        this.init()
    },
}
</script>

<style scoped>
nav {
    text-align: center;
}
</style>