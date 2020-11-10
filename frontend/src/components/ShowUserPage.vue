<template>
    <div>
        <h1>Test Page for GET method</h1>
        <h3>{{msg}}</h3>
    </div>
</template>

<script>
export default {
    created(){
        this.$http.get('/api/showUsers')
        .then((response)=>{
            this.msg = response.msg;
        })
    }
}
</script>