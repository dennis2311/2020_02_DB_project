<!-- The page which shows a task list and receives a participation. -->
<template>
<div>
    <h3>태스크 목록 및 참가신청 페이지</h3>
    <div v-for="(task, index) in tasks" v-bind:key="task">
        <!--<h5>{{index + 1}} {{task.NAME}} <button v-on:click="apply(index)">신청하기</button></h5> -->
        <h5>{{index + 1}} {{task.NAME}} 
            <button @click="handle_toggle" type="button"> 신청하기 </button>

            <div v-show="is_show">
                <h5>개인정보 이용 동의서</h5>
                <P>태스크에 참가신청을 하려면 개인정보 이용 동의를 해야합니다.</p>

                <button v-on:click="apply(index)"> 동의 후 신청</button>
            </div>
        </h5>

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
            is_show : false
        }
    },

    methods:{
        handle_toggle(){
            this.is_show = !this.is_show;
        },

       apply(index){
           this.is_show = ! this.is_show;
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