<template>
<div>
    <fieldset>
        <label for='uname'>用户名</label>
        <input
            type="text"
            id="uname"
            v-model="usernameVal"
            @blur="verifyUsername"
            @focus="clearWarn('showUsernameInfo')"
        >
        <span
            v-show="showUsernameInfo"
        >
            {{usernameInfo}}
        </span>
    </fieldset>
    <fieldset>
        <label for="pwd">密码</label>
        <input 
            type="password"
            id="pwd"
            v-model='pwdVal'
            @focus="clearWarn('showPwdInfo')"
            @blur="verifyPwd"
        >
        <span
            v-show="showPwdInfo"
        >
            {{pwdInfo}}
        </span>
    </fieldset>
    <fieldset>
        <label for="sure_pwd">确认密码</label>
        <input
            type="password"
            id="sure_pwd"
            v-model="surePwdVal"
            @focus="clearWarn('showSurePwdInfo')"
            @blur="verifySurePwd"
        >
        <span
            v-show="showSurePwdInfo"
        >
            {{surepwdInfo}}
        </span>
    </fieldset>
    <fieldset>
        <label for="avatar">头像</label>
        <input
            type="file"
            id="avatar"
            ref="avatar"
            @focus="clearWarn('showAvatarInfo')"
        >
        <span
            v-show="showAvatarInfo"
        >
            {{avatarInfo}}
        </span>
    </fieldset>
    <fieldset>
        <button
            @click="register"
        >确认</button>
    </fieldset>
</div>
</template>
<script>
import { REGISTER, VERIFY_USERNAME } from '../../api/index'
export default {
    name: 'Register.vue',
    data () {
        return {
            usernameVal: '',
            pwdVal: '',
            surePwdVal: '',
            usernameInfo: '',
            showUsernameInfo: false,
            showPwdInfo: false,
            pwdInfo: '',
            showSurePwdInfo: false,
            surepwdInfo: '',
            showAvatarInfo: false,
            avatarInfo: ''
        }
    },
    methods: {
        async register () {
            const verifyRes = await this.verifyAll()
            if (!verifyRes) {
                return
            }

            const fd = new FormData()
            fd.set('username', this.usernameVal)
            fd.set('password', this.pwdVal)
            fd.set('avatar', this.$refs.avatar.files[0])

            try {
                let res = await this.axios.post(REGISTER, fd, {
                    'Content-Type': 'multipart/form-data'
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
                    sessionStorage.setItem('avatar', res.data.avatarSrc)

                    this.$router.push({
                        path: '/'
                    })
                } else {
                    this.$message(`注册失败，请重试`)
                }
            } catch (error) {
                console.log(error)
            }
        },
        async verifyAll () {
            return await this.verifyUsername() && this.verifyPwd() && this.verifySurePwd() && this.verifyAvatar()
        },
        async verifyUsername () {
            const val = this.usernameVal
            if (val === '') {
                this.usernameInfo = '用户名不能为空'
                this.showUsernameInfo = true
                return false
            }
            
            try {
                const res = await this.axios.post(VERIFY_USERNAME, {
                    username: val
                })
                if (res.errno === 0) {
                    this.showUsernameInfo = false
                } else {
                    this.usernameInfo = `${res.msg}`
                    this.showUsernameInfo = true
                }
            } catch (error) {
                console.log(error)
            }
            return true
        },
        verifyPwd () {
            if (this.pwdVal === '') {
                this.pwdInfo = '密码不能为空'
                this.showPwdInfo = true
                return false
            }
            return true
        },
        verifySurePwd() {
            if (this.pwdVal !== this.surePwdVal) {
                this.surepwdInfo = '与密码不一致'
                this.showSurePwdInfo = true
                return false
            }
            return true
        },
        verifyAvatar () {
            if (this.$refs.avatar.files.length === 0) {
                this.showAvatarInfo = true
                this.avatarInfo = '必须上传头像'
                return false
            }
            return true
        },
        clearWarn (str) {
            this[str] = false
        }
    }
}
</script>
<style lang="stylus" scoped>
fieldset
    border none
</style>