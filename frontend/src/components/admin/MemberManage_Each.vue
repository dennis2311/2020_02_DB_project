<template>
<div>
    MemberManage_Each
</div>
    
</template>

<script>
export default {
    name:"MemberManage_Each",
    created(){
        if(this.$store.state.role!=='ADM'){
            alert("권한이 없습니다")
            this.$router.go(-1)
        } else {
            var id = this.$route.params.id
            this.$http.get(`/api/admin/membermanage/${id}`)
            .then(res => {
                
            })
        }
    },
    data: function(){
        return{
            user
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