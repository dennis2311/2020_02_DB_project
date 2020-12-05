<template>
<div>
    <h2>원본 데이터 파일을 업로드 해주세요</h2>
    <div>
        <table class='table table-dark' border='2px'>
            <thead>
                <tr>
                <th scope='col'> </th>
                <th scope='col'>NAME</th>
                <th scope='col'>승인여부</th>
                <th scope='col'>신청</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(task, index) in tasks" v-bind:key="task">
                    <td>{{index + 1}}</td>
                    <td>{{task.TASK_NAME}}</td>
                    <td>{{task.APPROVED}}</td>
                    <td>
                        <button> 제출하기 </button>
                    </td>
            </tbody>
        </table>
    </div>
</div>
</template>

<script>
export default {
    name: 'SubmitFilePage',

    created(){
        if(this.$store.state.role!=='SUB'){
            alert("권한이 없습니다")
            this.$router.go(-1)
        } else {
            var userid = this.$store.state.id;
            this.$http.get(`/api/submittee/approvedtasks`)
            .then(res =>{
                this.tasks = res.data
            })
        }
    },
    data(){
        return{
            tasks : [],
            is_approved : false

        }
    },
    methods: {
        checkApproved: function(task) {
            if(tasks.APPROVED == 1){
                this.is_approved = true
            } else {
                this.is_approved = false
            }
        }
    }
      
}
</script>