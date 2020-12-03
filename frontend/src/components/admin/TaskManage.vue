<template>
<!-- ON-WORK -->
<div>
    <h5>태스크 관리</h5>
    <!-- show each task and participation applicant -->
    <div v-for="task in all_tasks" v-bind:key="task">
        <h3>Task: {{task[0]}}</h3>
    </div>
    <h2>다음의 승인 요청이 들어왔습니다.</h2>
    <div v-for="(task, index) in tasks_YSUB" :key="task" :index="index">
        <h4>{{index + 1}}번째 요청) 태스크: {{task[0]}}, 제출자: {{task[1]}},  평가 점수: {{task[2]}}
        <input type="checkbox" :name="index" :id="index" :value="task" v-model="accept_task">승인
        <input type="checkbox" :name="index" :id="index" :value="task" v-model="reject_task">거절
        </h4>
    </div>
    <button v-on:click="submit_accept">제출</button>
    <!-- for each applicant, show -->
</div>
</template>


<script>
// >제출자가 태스크에 참여하기 위해서는 태스크 참여 신청한 뒤 관리자의 승인을 기다려야 한다. 
// >관리자는 각 태스크의 참여신청자 명단을 확인할 수 있어야 하고, 
// >각 제출자들의 평가 점수를 기준으로 참여 여부를 판단하고 rmffo
// >승인 및 거절이 가능하여야 한다. - by checkbox(승인/거절)
// 관리자는 또한 태스크에 새로운 원본 데이터 타입을 추가 할 수 있다. - new page..? 
// how: 각 원본 데이터 타입의 스키마 정보를 입력하고 해당 스키마가 
// 태스크 데이터 테이블의 스키마와 어떻게 매핑 되는지에 대한 
// 정보를 추가할 수 있어야 한다......use ORIGINAL_DATA_TYPE TABLE
// PASS_GRADE added to PARSING_DATA_SEQUENCE_FILE for ..-->
// -->관리자는 해당 태스크의 데이터에 대한 Pass 기준을 설정할 수 있어야 한다.
// ON-WORK
export default {

    created(){
        if(this.$store.state.role!=='ADM'){
            alert("권한이 없습니다")
            this.$router.go(-1)
        }  else {
            this.$http.post('/api/admin/taskmanage',{
                accept : this.accept_task
            })
            .then(res => {
                if(res.data.success){
                    this.all_tasks = res.data.all_tasks
                    this.tasks_YSUB = res.data.tasks_YSUB
                }
                else{
                    alert(res.data.message)
                }
            })
        }
    },

    data: function(){
        return{
            all_tasks : [],
            tasks_YSUB : [],
            accept_task : [],
            reject_task : [],
        }
    },

    methods : {
        submit_accept(){
            alert(this.accept_task)
            // event.preventDefault()
            this.$http.post('/api/admin/taskmanage',{
                accept:this.accept_task,
            })
            .then(res => {
                alert("제출되었습니다")
                if(res.data.success){
                    this.all_tasks = res.data.all_tasks
                    this.tasks_YSUB = res.data.tasks_YSUB
                }
                else{
                    alert(res.data.message)
                }
        })
        },
    },

    name : 'TaskManage'
}
</script>