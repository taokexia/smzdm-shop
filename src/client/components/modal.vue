<template>
    <transition name="vmodal">
        <div class="vmodal-mask">
            <div class="vmodal-container">
                <div class="vmodal-header">
                    <!-- 通过 $emit 触发父组件绑定方法 -->
                    <span class="pull-right dismiss" @click="$emit('close')">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </span>
                    <!-- 定义内容插槽 -->
                    <slot name="header"></slot>
                </div>
                <div class="vmodal-body">
                    <!-- 定义内容插槽 -->
                    <slot name="body"></slot>
                </div>
                <div class="vmodal-footer">
                    <!-- 定义内容插槽 -->
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    
    </transition>
</template>

<style>
.vmodal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
}
.vmodal-container {
    width: 550px;
    max-width: 90%;
    margin: 150px auto 0;
    padding:  10px 20px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
}
.vmodal-header {
    padding: 5px 0;
    overflow: hidden;
    & .dismiss {
        color: #666;
        font-size: 14px;
        cursor: pointer;
    }
}
.vmodal-body {
    padding: 10px 50px 50px;
    color: #666;
    font-size: 16px;
    line-height: 1.8em;
}
.vmodal-enter {
    opacity: 0;
}
.vmodal-leave-active {
    opacity: 0;
}
.vmodal-enter .vmodal-container,
.vmodal-leave-active .vmodal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>

