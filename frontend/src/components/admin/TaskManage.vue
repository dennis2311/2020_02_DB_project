<template>
<!-- ON-WORK -->
<div>
    <h5>태스크 관리</h5>
    <!-- show each task and participation applicant -->
    <div v-for="(task,index) in all_tasks" :key="task" :index="index">
        <h5>Task: {{task[0]}}, 통과 점수: {{task[1]}}
        </h5>
    </div>

    <!-- select task and pass grade -->
    <select v-model="task_grade_sel">
        <option disabled value="">태스크</option>
        <option v-for="task in all_tasks" :key="task">{{task[0]}}</option>
    </select>
    <select v-model.number="pass_grade">
        <option disabled value="">통과 점수 변경</option>
        <option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option>
        <option>6</option><option>7</option><option>8</option><option>9</option><option>10</option>
    </select>
    <button v-on:click="submit_accept">제출</button>

    <h2>다음의 승인 요청이 들어왔습니다.</h2>
    <div v-for="(task, index) in tasks_YSUB" :key="task" :index="index">
        <h4>{{index + 1}}번째 요청) 태스크: {{task[0]}}, 제출자: {{task[1]}},  평가 점수: {{task[2]}}
        <input type="checkbox" :name="index" :id="index" :value="task" v-model="accept_task">승인
        <input type="checTATTASKkbox" :name="index" :id="index" :value="task" v-model="reject_task">거절
        </h4>
    </div>
    <button v-on:click="submit_accept">제출</button>
</div>
</template>


<script>
// 관리자는 또한 태스크에 새로운 원본 데이터 타입을 추가 할 수 있다. - new page..? 
// how: 각 원본 데이터 타입의 스키마 정보를 입력하고 해당 스키마가 
// 태스크 데이터 테이블의 스키마와 어떻게 매핑 되는지에 대한 
// 정보를 추가할 수 있어야 한다......use ORIGINAL_DATA_TYPE TABLE
export default {

    created(){
        if(this.$store.state.role!=='ADM'){
            alert("권한이 없습니다")
            this.$router.go(-1)
        }  else {
            this.$http.post('/api/admin/taskmanage',{
                accept : this.accept_task,
                pass_grade : this.pass_grade,
                task_grade_sel : this.task_grade_sel
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
            task_grade_sel : "",
            pass_grade : 0,
        }
    },

    methods : {
        submit_accept(){

            this.$http.post('/api/admin/taskmanage',{
                accept : this.accept_task,
                pass_grade : this.pass_grade,
                task_grade_sel : this.task_grade_sel
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