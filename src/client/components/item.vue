<template>
    <div class="product">
        <div class="product-header">
            <h4>
                <router-link :to="'/product/' + product._id">{{ product.name }}</router-link>
                <span>{{ product.price }}元</span>
            </h4>
        </div>
        <div class="product-body">
            <img :src="product.img">
            <div class="product-content">
                <div class="product-tags">
                    <span>标签：</span>
                    <router-link v-for="tag in product.tags" :key="tag" :to="'/tag/' + tag">{{ tag }}</router-link>
                </div>
                {{ product.details && product.details.slice(0, 300) + '...' }}
                <div class="product-link">
                    <span class="product-follow">
                        <i v-if="isCollected" @click="unfollow(product._id)" class="fa fa-star"></i>
                        <i v-else @click="follow(product._id)" class="fa fa-star-o"></i>
                        {{ collectedCount }}
                    </span>
                    <span>{{ product.prettyCreatedAt }}</span>
                    <a :href="product.link" target="_blank">去购买</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { fetch, product } from '../api'
export default {
    props: {
        product: Object,
    },
    data() {
        return {
            isCollected: false,
            collectedCount: this.product.collectedCount,
        }
    },
    computed: {
        // 获取当前登录用户
        user() {
            return this.$store.getters.currentUser
        }
    },
    methods: {
        // 收藏商品
        async follow(_id) {
            let res = await fetch.post(product.follow, { _id })
            if (res.data.ok) {
                this.isCollected = true
                this.collectedCount += 1
            }
        },
        // 取消收藏商品
        async unfollow(_id) {
            let res = await fetch.post(product.unfollow, { _id })
            if (res.data.ok) {
                this.isCollected = false
                this.collectedCount -= 1
            }
        },
    },
    mounted() {
        // 判断当前用户是否收藏了该商品
        if (this.user.user) {
            if (this.product.collectedUsers.indexOf(this.user.user._id) > -1) {
                this.isCollected = true
            }
        }
    }
}
</script>