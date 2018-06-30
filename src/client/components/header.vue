<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-3">
                <div class="logo">什么值得买</div>
            </div>
            <div class="col-sm-6 search">
                <div class="input-group">
                    <!-- 修改输入框代码，绑定 search 变量 -->
                    <input type="text" class="form-control" placeholder="" v-model="search">
                    <span class="input-group-btn">
                        <!-- 修改搜索按钮代码，绑定点击方法 -->
                        <button class="btn btn-default" type="button" @click="goSearch">
                            <i class="fa fa-search" aria-hidden="true"></i>
                        </button>
                    </span>
                </div>
                <div class="hot-search">
                    <!-- 修改热门搜索，直接跳转到搜索结果页 -->
                    <span>热门搜索</span>
                    <router-link to="/search?search=专享">专享</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 新增 js 代码
export default {
    data() {
        return {
            search: ''
        }
    },
    methods: {
        // 跳转到搜索结果页
        goSearch() {
            this.$router.push({ path: '/search', query: { search: this.search }})
        }
    },
    mounted() {
        // 获取搜索关键字
        this.search = this.$route.query.search
    }
}
</script>

<style scoped>
.container {
    padding-top: 20px;
    padding-bottom: 20px;
}
.logo {
    font-size: 28px;
    color: #f04848;
}
.input-group {
    & input {
        border: solid 2px #f04848;

        &:hover,
        &:focus {
            outline: none;
            box-shadow: none;
        }
    }
    & .btn {
        font-size: 13px;
        color: #fff;
        background: #f04848;
        border: solid 2px #f04848;
        border-left: solid 1px #f04848;

        &:hover,
        &:focus {
            outline: none;
            box-shadow: none;
        }
    }
}
.hot-search {
    margin: 4px 0;
    font-size: 12px;
}
</style>
