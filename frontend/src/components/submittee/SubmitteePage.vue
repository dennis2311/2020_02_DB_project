<template>
<div>
    <h1>제출자 페이지</h1>
    <router-view/>
</div>
    
</template>

<script>
export default {
    name:'SubmitteePage',
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