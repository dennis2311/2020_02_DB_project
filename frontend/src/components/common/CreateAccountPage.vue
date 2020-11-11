<template>
    <div>
        <h1>Create new Account</h1>
        <h3>{{msg}}</h3>
    </div>
</template>

<script>
export default {
    created(){
        this.$http.get('/api/createaccount')
        .then((response)=>{
            this.msg = response.data;
        })
    }
}
</script>