<template>
    
</template>

<script>
export default {
    name:'MemberManage_EachDetail',
    created(){
        if(this.$store.state.role!=='ADM'){
            alert("권한이 없습니다")
            this.$router.go(-1)
        } else {
            var id = this.$route.params.id
            var taskname = this.$route.params.taskname
            this.$http.get(`/api/admin/membermanage/${id}/${taskname}`,{

            })
            .then(res => {
                if(res.data){
                    this.userData = res.data[0]
                    this.userData.ROLE = converter(this.userData.ROLE)
                } else {
                    this.$router.go(-1)
                    alert("서버 문제입니다. 계속되는 경우 관리자에게 문의하세요.")
                }
            })
            .catch(function(error){
                alert(error)
            })
        }
    },
    data:function(){
        return {

        }
    }
}
</script>

<style scoped>

</style>