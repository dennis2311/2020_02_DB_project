<!-- The page which shows a task list and receives a participation. -->
<template>
<div>
    <h3>태스크 목록 및 참가신청 페이지</h3>
    <br>
    <h5>개인정보 이용 동의서</h5>
    <P>태스크에 참가신청을 하려면 개인정보 이용 동의를 해야합니다.</p>
    <button @click="handle_toggle" type="button"> {{agreement}} </button>
    <div v-show="is_show">
     <table class='table table-dark' border='2px'>
        <thead>
            <tr>
            <th scope='col'> </th>
            <th scope='col'>NAME</th>
            <th scope='col'>TASK_DESCRIPTION</th>
            <th scope='col'>MIN_UPLOAD_PERIOD</th>
            <th scope='col'>TASK_TABLE_SCHEMA_INFO</th>
            <th scope='col'>ADMIN_ID</th>
            <th scope='col'>신청</th>
            </tr>
        </thead>
            <tbody>
                <tr v-for="(task, index) in tasks" v-bind:key="task">
                    <td>{{index + 1}}</td>
                    <td>{{task.NAME}}</td>
                    <td>{{task.TASK_DESCRIPTION}}</td>
                    <td>{{task.MIN_UPLOAD_PERIOD}}</td>
                    <td>{{task.TASK_TABLE_SCHEMA_INFO}}</td>
                    <td>{{task.ADMIN_ID}}</td>
                    <td>
                        <button @click="apply(index)" type="button"> 신청하기 </button>
                    </td>
            
            </tbody>
    </table>
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
            tasks : [],
            is_show : false,
            agreement : "동의"
        }
    },

    methods:{
        handle_toggle(){
            this.is_show = !this.is_show
            if(is_show){
                this.agreement = "비동의";
            }else{
                this.agreement = "동의";
            }
        },

       apply(index){
           var taskname = this.tasks[index].NAME;
           var userid = this.$store.state.id;

           this.$http.get(`/api/submittee/tasklist/${taskname}/${userid}`)
           .then(res => {
                alert(res.data.message);
            });

       }
    }
}
</script>