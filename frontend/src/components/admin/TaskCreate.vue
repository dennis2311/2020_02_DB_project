<template>
    <h5>태스크 생성</h5>
</template>

<script>
export default {
    created(){
        if(this.$store.state.role!=='ADM'){
            alert("권한이 없습니다")
            this.$router.go(-1)
        }
    },
    name : 'TaskCreate'
}
</script>