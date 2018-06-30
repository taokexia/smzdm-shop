<template>
    <div class="products-list">
        <slot name="header"></slot>
        <!-- 循环显示商品 -->
        <item-component v-for="product in products"
            :key="product._id"
            :product="product"
            ></item-component>
    </div>
</template>

<script>
import item from './item.vue'

export default {
    props: {
        products: Array,
    },
    components: {
        'item-component': item,
    },
}
</script>

<style scoped>
.products-list {
    padding: 10px;
    margin: 20px 0;
    background: #fff;
}
</style>
