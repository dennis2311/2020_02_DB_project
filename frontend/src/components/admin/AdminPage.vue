<template>
<div>
    <h1>관리자 페이지</h1>

    <b v-if="this.$store.state.loggedIn">count : {{this.$store.state.count}}</b>

    <input type="button" @click="increment()" value="increment"/>
    <router-link to="/submittee">go to submittee</router-link>

    <router-link to='/admin/taskcreate'>태스크 생성</router-link> |
    <router-link to='/admin/taskmanage'>태스크 관리</router-link> |
    <router-link to='/admin/taskstatistics'>태스크 통계</router-link> |
    <router-link to='/admin/membermanage'>회원 관리 및 통계</router-link>
    <router-view/>
</div>
    
</template>

<script>
export default {
    created(){
        if(this.$store.state.role!=='ADM'){
            alert("권한이 없습니다")
            this.$router.go(-1)
        }
    },
    name:'AdminPage',
    methods:{
        increment: function (event) {
            this.$store.commit('increment')
        }
    },
}
</script>

<style scoped>
    h1, h2 {
    font-weight: normal;
    }
    ul {
    list-style-type: none;
    padding: 0;
    }
    li {
    display: inline-block;
    margin: 0 10px;
    }
    a {
    color: #42b983;
    }
</style>