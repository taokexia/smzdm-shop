<template>
    <div>
        <el-menu theme="dark" :default-active="$route.path" class="el-menu-demo" mode="horizontal" :router="true">
            <el-menu-item index="/">什么值得买</el-menu-item>
            <el-menu-item index="/admin/categories">分类管理</el-menu-item>
            <el-menu-item index="/admin/tags">标签管理</el-menu-item>
            <el-menu-item index="/admin/products">商品管理</el-menu-item>
            <el-menu-item index="/admin/users">用户管理</el-menu-item>
        </el-menu>
        <!-- 定义内容插槽 body -->
        <slot name="body"></slot>
    </div>
</template>
