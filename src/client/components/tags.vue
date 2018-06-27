<template>
    <side-component>
        <div slot="header">标签</div>
        <div slot="body">
            <!-- 通过 for 循环显示标签 -->
            <router-link v-for="tag in tags" :key="tag._id" :to="'/tag/' + tag.name">{{ tag.name }}</router-link>
        </div>
    </side-component>
</template>

<script>
import side from './side.vue'
import { fetch, tag } from '../api'

export default {
    components: {
        'side-component': side
    },
    data() {
        return {
            tags: []
        }
    },
    methods: {
        // 按分页获取标签
        // 这里获取第一页的标签
        async getTags(page) {
            let res = await fetch.get(tag.findByPage(page))
            if (res.data.ok) {
                this.tags = res.data.tags.docs
            }
        }
    },
    mounted() {
        this.getTags(1)
    }
}
</script>

<style scoped>
a {
    display: inline-block;
    padding: 1px 2px;
    margin: 0 2px 2px 0;
    color: #666;
    font-size: 14px;
    &:hover,
    &:focus {
        color: #333;
        text-decoration: none;
    }
}
</style>

