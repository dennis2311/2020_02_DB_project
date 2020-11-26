<template>
  <div id="app">
    <img src="./assets/banner.png">

    <div v-if="this.$store.state.loggedIn">
      <button v-on:click="logOut">로그아웃</button> |
      <router-link to="/changepassword">정보 수정</router-link> |
      <router-link to="/signout"
        v-if="this.$store.state.role!=='ADM'">회원 탈퇴</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods:{
    logOut: function(event){
      event.preventDefault();
      this.$store.commit('logOut')
      alert('성공적으로 로그아웃 되었습니다. 메인화면으로 돌아갑니다.')
      this.$router.push('/api')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
