<template>
<div>
    <h1>제출자 페이지</h1>

    <b v-if="this.$store.state.loggedIn">count : {{this.$store.state.count}}</b>

    <input type="button" @click="increment()" value="increment"/>
    <router-link to="/admin">go to admin</router-link>

    <router-view/>
</div>
    
</template>

<script>
export default {
    name:'SubmitteePage',
    methods: {
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