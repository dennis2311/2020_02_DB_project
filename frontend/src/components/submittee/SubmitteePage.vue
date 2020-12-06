<template>
<div>
    <router-link to='/submittee/tasklist'>태스크 참여신청</router-link> |
    <router-link to='/submittee/submitfilepage'>원본 데이터 시퀀스 파일 제출</router-link> |
    <router-link to='/submittee/submonitor'>제출 현황 모니터링 및 평가 점수 확인</router-link> |
    <router-view/>
</div>
    
</template>

<script>
export default {
    created(){
        if(this.$store.state.role!=='SUB'){
            alert("권한이 없습니다")
            this.$router.go(-1)
        }
    },
    name:'SubmitteePage',
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