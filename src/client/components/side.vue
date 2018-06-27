<template>
    <div class="side">
        <div class="side-header">
            <slot name="header"></slot>
        </div>
        <div class="side-body">
            <slot name="body"></slot>
        </div>
    </div>
</template>

<script>
</script>

<style scoped>
.side {
    padding: 10px;
    margin: 20px 0;
    background: #fff;
}
.side-header {
    padding: 0 10px;
    margin: 0 0 10px 0;
    font-size: 20px;
    border-left: solid 2px #f04848;
}
.side-body {
    padding: 10px;
    border-top: solid 1px #eee;
    font-size: 0;
}
</style>

