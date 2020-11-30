<!-- The page which shows a task list and receive a participation. -->
<template>
<div>
    <h3>태스크 목록 및 참가신청 페이지</h3>
    <div v-for="(task, index) in tasks" v-bind:key="task">
        <h5>{{index + 1}} {{task.NAME}} <button v-on:click="apply()">신청하기</button></h5>
    </div>
</div>   
</template>

<script>
export default {
    created(){
        if(this.$store.state.role!=='SUB'){
            alert("권한이 없습니다")
            this.$router.go(-1)
        } else {
            this.$http.get('/api/submittee/tasklist')
            .then(res => {
                this.tasks = res.data
            })
        }
    },
    data: function(){
        return{
            tasks : []
        }
    },

    methods:{
       apply(){
           alert('신청완료');
       }
    }
}
</script>