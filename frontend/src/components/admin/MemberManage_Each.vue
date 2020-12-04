<template>
<div>
    <h2>유저 정보 상세 보기</h2>
    <div>유저 이름 : {{userData.NAME}}</div>
    <div>아이디 : {{userData.ID}}</div>
    <div>역할 : {{userData.ROLE}} </div>
    <div v-if="userData.ROLE==='제출자'">평가점수 : {{userData.EVALUATION_GRADE}} </div>
    <div>성별 : {{userData.GENDER}} </div>
    <div>주소 : {{userData.ADDRESS}} </div>
    <div>전화번호 : {{userData.PHONE}} </div>
    <div>생일 : {{userData.BIRTHDATE}} </div>
    
    <div v-if="hasTask">[참여 태스크 목록]{{userData.TASK_NAME}}
        <div v-for="task in taskData" v-bind:key="task">{{task.TASK_NAME}}</div>
    </div>
    <div v-else>(사용자가 참여중인 태스크가 없습니다)</div>
</div>
    
</template>

<script>
const converter = role => {
    if (role==='ASE') return '평가자'
    else return '제출자'
}
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

            this.$http.get(`/api/admin/membermanage/${id}/task`)
            .then(res=>{
                if(res.data[0]!==undefined){
                    this.taskData = res.data
                    this.hasTask = true
                }
            })
            .catch(function(error){
                alert(error)
            })
        }
    },
    data: function(){
        return{
            userData : {},
            taskData : [],
            hasTask : false
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