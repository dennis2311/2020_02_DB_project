<template>
<div>
    <h1>관리자 페이지</h1>
    <button v-on:click="goMain">홈으로 돌아가기</button>
    <router-view/>
</div>
    
</template>

<script>
export default {
    name:'AdminPage',
    methods:{
        goMain: function(e){
            e.preventDefault();
            this.$router.push('/');
        }
    }
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