<template>
    <layout-component>
        <div class="product-details" slot="body">
            <div class="ditails-header">
                <div class="details-img">
                    <img :src="product.img">
                </div>
                <div class="details-info">
                    <h4>
                        <span>{{ product.name }}</span>
                        <span class="price">{{ product.price }}元</span>
                    </h4>
                    <div class="details-tags">
                        标签：
                        <router-link v-if="product.tags.length"
                            v-for="tag in product.tags"
                            :key="tag"
                            :to="'/tag/' + tag"
                            class="details-tag">{{ tag }}</router-link>
                    </div>
                    <div class="details-time">
                        更新时间：{{ product.prettyCreatedAt }}
                    </div>
                    <a class="btn btn-danger details-link" :href="product.link" target="_blank">去购买</a>
                </div>
            </div>
        <div class="details-content" v-html="product.markedDetails"></div>
        </div>
    </layout-component>
</template>

<script>
import layout from '../components/layout.vue'
import { fetch, product } from '../api'

export default {
    components: {
        'layout-component': layout,
    },
    data() {
        return {
            product: {
                category: {
                    name: '',
                    url: ''
                }
            }
        }
    },
    computed: {
        // 获取商品 id
        productId() {
            return this.$route.params.id
        }
    },
    watch: {
        // id 变化时重现获取商品
        productId() {
            this.getProduct()
        }
    },
    methods: {
        // 获取商品详情
        async getProduct() {
            let res = await fetch.get(product.findById(this.productId))
            if (res.data.ok) {
                this.product = res.data.product
            }
        }
    },
    mounted() {
        this.getProduct()
    }
}
</script>

<style>
.product-details {
    padding: 20px;
    margin-top: 20px;
    background: #fff;
}
.details-header {
    margin-bottom: 50px;
    overflow: hidden;
    & .details-img {
        float: left;
        width: 250px;
        & img {
            width: 100%;
        }
    }
    & .details-info {
        width: auto;
        margin-left: 270px;
        & h4 {
            padding: 0 0 10px 0;
            margin: 0 0 10px 0;
            border-bottom: dashed 1px #eee;
        }
        & .price {
            color: #f04848;
        }
    }
    & .details-tags,
    & .details-time {
        margin: 10px 0;
        font-size: 14px;
        & .details-tag {
            display: inline-block;
            margin-right: 4px;
        }
    }
    & .details-link {
        padding: 4px 20px;
        margin-top: 10px;
        font-size: 16px;
    }
}
.details-content {
    font-size: 15px;
}
</style>