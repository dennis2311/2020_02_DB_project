<template>
<div>
    <h1>2020-02 DB project</h1>
    <h3>Please login for service</h3>

    <h4>or</h4>

    <router-link to='/createaccount'>create new account</router-link> |
    <router-link to='/findaccount'>forgot ID/password?</router-link>

    <h4>{{msg}}</h4>

</div>
    
</template>

<script>
export default {
    created(){
        this.$http.get('/api/')
        .then((response)=>{
            this.msg = response.data;
        })
    },
    name:'LoginPage'
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