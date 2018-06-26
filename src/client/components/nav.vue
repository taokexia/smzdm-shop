<template>
    <nav>
        <div class="container">
            <router-link to="/" exact>首页</router-link>
            <!-- 通过 for 循环显示分类 -->
            <router-link v-if="cates.cates" v-for="cate in cates.cates" :key="cate.url" :to="'/category/' + cate.url">{{ cate.name }}</router-link>
            <div class="pull-right">
                <template v-if="user && user.ok">
                    <router-link to="/user">{{ user.user.username }}</router-link>
                    <router-link v-if="user && user.user && user.user.isAdmin" to="/admin/categories">管理</router-link>
                    <a href="#" @click="logout">退出</a>
                </template>
                <template v-else>
                    <a href="#" @click="showModal=true; showLogin=true">登录</a>
                    <a href="#" @click="showModal=true; showLogin=false">注册</a>
                </template>
            </div>
        </div>
        <!-- 使用 modal 组件，并绑定 close 方法 -->
        <modal v-if="showModal" @close="showModal=false">
            <!-- 通过 slot 插入内容 -->
            <div slot="body" class="vmodal-body">
                <a class="title" href="#" @click="showLogin=true" :class="showLogin ? 'active' : ''">登录</a>
                <a class="title" href="#" @click="showLogin=false" :class="showLogin ? '' : 'active'">注册</a>
                <div class="content">
                    <form v-if="showLogin">
                        <div class="form-group">
                            <input type="email" class="form-control" placeholder="邮箱" v-model="signinEmail">
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" placeholder="密码" v-model="signinPassword">
                        </div>
                        <a class="sign-btn" @click="signin">登录</a>
                    </form>
                    <form v-else>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="昵称" v-model="signupUsername">
                        </div>
                        <div class="form-group">
                            <input type="email" class="form-control" placeholder="邮箱" v-model="signupEmail">
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" placeholder="密码" v-model="signupPassword">
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" placeholder="确认密码" v-model="signupRepassword">
                        </div>
                        <a class="sign-btn" @click="signup">注册</a>
                    </form>
                </div>
            </div>
        </modal>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            showModal: false,
            showLogin: true,

            signinEmail: '',
            signinPassword: '',

            signupUsername: '',
            signupEmail: '',
            signupPassword: '',
            signupRepassword: '',
        }
    },
    computed: {
        user() {
            // 通过 store 中定义的 getters 获取用户信息
            return this.$store.getters.currentUser
        },
        cates() {
            // 从 store 的 getters 获取所有分类 添加
            return this.$store.getters.cates
        }
    },
    methods: {
        async signin() {
            let user = {
                email: this.signinEmail,
                password: this.signinPassword
            }
            // 通过 store dispatch 触发 action
            await this.$store.dispatch({
                type: 'signin',
                user: user
            })
            this.showModal = false
        },
        async signup() {
            let user = {
                username: this.signupUsername,
                email: this.signupEmail,
                password: this.signupPassword,
                repassword: this.signupRepassword,
            }
            await this.$store.dispatch({
                type: 'signup',
                user: user
            })
            this.showModal = false
        },
        logout() {
            this.$store.dispatch({ type: 'logout' })
        }
    },
    mounted() {
        // 组件挂载后通过 store dispatch 请求所有分类 添加
        this.$store.dispatch({ type: 'getCates' })
    }
}
</script>

<style scoped>
nav {
    color: #fff;
    background: #333;
}
.container {
    font-size: 0;

    & a {
        display: inline-block;
        padding: 10px 24px;
        color: #fff;
        font-size: 14px;
        text-align: center;

        &.active,
        &:hover,
        &:focus {
            background: #464646;
            text-decoration: none;
        }
    }
}
.vmodal-body {
    text-align: center;
    & .title {
        display: inline-block;
        margin: 0 10px 20px;
        color: #666;
        &:hover,
        &:focus,
        &.active {
            color: #333;
            text-decoration: none;
        }
        &.active {
            color: #333;
            border-bottom: solid 2px #f04848;
        }
    }
    & .content {
        & input {
            width: 80%;
            margin: 10px auto;
        }
        & .sign-btn {
            display: block;
            width: 80%;
            padding: 4px 0;
            margin: 20px auto 0;
            color: #fff;
            background: #f04848;
            font-size: 16px;
            text-align: center;
            cursor: pointer;
            &:hover,
            &:focus {
                text-decoration: none;
            }
        }
    }
}
</style>

