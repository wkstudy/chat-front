<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  mounted () {
    // 页面刷新，重新设置vuex
    const sessionStorage = window.sessionStorage
    const username = sessionStorage.getItem('username')
    const avatar = sessionStorage.getItem('avatar')
    if (username) {
      this.$store.commit({
        type: 'setUserName',
        username
      })
    }
    if (avatar) {
      this.$store.commit({
        type: 'setAvatar',
        avatar
      })
    }
  }
}
</script>
<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
