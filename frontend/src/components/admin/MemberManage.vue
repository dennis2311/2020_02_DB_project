<template>
<div>
    <h2>가입 유저 목록입니다. 클릭 시 상세 보기로 넘어갑니다.</h2>
    <div v-for="user in users" v-bind:key="user">
        <router-link :to="{name:'MemberManage_Each', params:{id:user.ID}}">{{user.ID}} ({{user.ROLE}})</router-link>
    </div>
</div>
    
</template>

<script>
export default {
    created(){
        if(this.$store.state.role!=='ADM'){
            alert("권한이 없습니다")
            this.$router.go(-1)
        } else {
            this.$http.get('/api/admin/membermanage')
            .then(res => {
                this.users = res.data
            })
        }
    },
    data: function(){
        return{
            users : []
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