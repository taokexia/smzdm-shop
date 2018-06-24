<template>
    <layout-component>
        <div slot="body">page not found</div>
    </layout-component>
</template>

<script>
import layout from '../components/layout.vue'
export default {
    data() {
        return {
        }
    },
    head: {
        title: {
            inner: '页面不存在'
        }
    }
}
</script>

