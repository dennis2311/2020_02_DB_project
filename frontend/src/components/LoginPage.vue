<template>
<div>
    <h1>2020-02 DB project</h1>
    <h3>Choose your role and log in for service \n</h3>

    <router-link to="/admin"> Administrator</router-link> |
    <router-link to="/assessor"> Assessor</router-link> |
    <router-link to="/submittee"> Submittee</router-link>
</div>
    
</template>

<script>
export default {
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