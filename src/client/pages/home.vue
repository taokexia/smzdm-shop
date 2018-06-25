<template>
    <layout-component>
        <div slot="body"><!-- 通过指定body插入内容 -->
            home
        </div>
    </layout-component>
</template>

<script>
import layout from '../components/layout.vue'
export default {
    components: {
        'layout-component': layout,
    },
    head: {
        title: { //用于VueHead组件
            inner: '首页'
        }
    }
}
</script>
