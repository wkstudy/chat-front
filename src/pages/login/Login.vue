<template>
<div>
    <fieldset>
        <label for="uname">用户名</label>
        <input
            type="text"
            name="uname"
            id="uname"
            placeholder="请输入用户名"
            v-model="unameVal"
        >
        <span
            v-show="loginShow"
        >{{loginMsg}}</span>
    </fieldset>
    <fieldset>
        <label for="pwd">密码</label>
        <input
            type="password"
            name="pwd"
            id="pwd"
            v-model="pwdVal"
        >
        <span
            v-show="registerShow"
        >{{registerMsg}}</span>
    </fieldset>
    <fieldset>
        <input
            type="button"
            value="登录"
            id="login-btn"
            @click="handleLogin"
        >
        <input
            type="button"
            value="注册"
            id="register-btn"
            @click="pageToRegister"
        >
    </fieldset>
</div>
</template>
<script>
import { LOGIN } from '@/api/index'
export default {
    name: 'Login.vue',
    data () {
        return {
            unameVal: '',
            pwdVal: '',
            loginMsg: '',
            registerMsg: '',
            loginShow: false,
            registerShow: false
        }
    },
    methods: {
        async handleLogin () {
            // 值验证
            if (this.unameVal === '') {
                this.loginMsg = '用户名不能为空'
                this.loginShow = true
                return
            } else {
                this.loginShow = false
            }
            if (this.pwdVal === '') {
                this.registerMsg = '密码不能为空'
                this.registerShow = true
                return
            } else {
                this.registerShow = false
            }

            // 发送请求
            let res = await this.axios.post(LOGIN, {
                username: this.unameVal,
                password: this.pwdVal
            })

            if (res.errno === 0) {
                // 存储登录信息
                this.$store.commit({
                    type: 'setUserName',
                    username: res.data.username
                })
                this.$store.commit({
                    type: 'setAvatar',
                    avatar: res.data.avatar
                })
                // 同时存储到sessionStroage中，防止页面刷新vuex中数据丢失
                const sessionStorage = window.sessionStorage
                sessionStorage.setItem('username', res.data.username)
                sessionStorage.setItem('avatar', res.data.avatar)

                this.$router.push({
                    path: '/'
                })
            } else {
                this.$message(`${res.msg}`)
                this.unameVal = ''
                this.pwdVal = ''
            }
        },
        pageToRegister () {
            this.$router.push({
                path: '/register'
            })
        }
    }
}
</script>
<style lang="stylus" scoped>
fieldset
    border 0
</style>
