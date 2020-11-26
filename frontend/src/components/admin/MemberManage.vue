<template>
    <h5>회원 관리 및 통계</h5>
</template>

<script>
export default {
    created(){
        if(this.$store.state.role!=='ADM'){
            alert("권한이 없습니다")
            this.$router.go(-1)
        }
    },
    name : 'MemberManage'
}
</script>