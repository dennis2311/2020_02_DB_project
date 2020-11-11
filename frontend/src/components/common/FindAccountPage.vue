<template>
    <div>
        <h1>Find ID / Find password</h1>
        <h3>{{msg}}</h3>
    </div>
</template>

<script>
export default {
    created(){
        this.$http.get('/api/findaccount')
        .then((response)=>{
            this.msg = response.data;
        })
    }
}
</script>