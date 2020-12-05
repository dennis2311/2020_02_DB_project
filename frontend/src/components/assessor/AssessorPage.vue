<template>
<div>
    <router-link to='/assessor/parsingevaluate'>파싱 데이터 시퀀스 파일 평가</router-link> |
    <router-link to='/assessor/monitorhistory'>평가 내역 모니터링</router-link> |
    <router-link to='/assessor/evalgrademanage'>제출자 평가 점수 관리</router-link> |
    <router-view/>
</div>
    
</template>

<script>
export default {
    created(){
        if(this.$store.state.role!=='ASE'){
            alert("권한이 없습니다")
            this.$router.go(-1)
        }
    },
    name:'AssessorPage',
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