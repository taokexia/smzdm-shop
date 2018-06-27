<template>
    <div class="layout">
        <header-component></header-component>
        <nav-component></nav-component>
        <div class="container">
            <div class="row">
                <div class="col-sm-9">
                    <slot name="body"></slot><!-- slot用于内容分发 -->
                </div>
                <div class="col-sm-3">
                    <tags-component></tags-component>
                    <slot name="side"></slot>
                </div>
            </div>
        </div>
        <footer-component></footer-component>
    </div>
</template>

<script>
import header from './header.vue'
import footer from './footer.vue'
import nav from './nav.vue'
import tags from './tags.vue'

export default {
    components: {
        'header-component': header,
        'footer-component': footer,
        'nav-component': nav,
        'tags-component': tags,
    }
}
</script>

<style scoped>
.layout {
    background: #f5f5f5;
}
</style>
