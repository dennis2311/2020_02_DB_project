<template>
    <div>
        <h1>아이디 / 비밀번호 찾기</h1>
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