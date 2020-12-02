<!-- The page which shows the parsing data sequence files allocated to user 
and receives the qualitative evaluation of parsing data sequence files . -->
<template>
<div>
    <h3>파싱 데이터 시퀀스 파일 정성평가 페이지</h3>
    <div v-for="(file, index) in files" v-bind:key="file">
        <!--<h5>{{index + 1}} {{task.NAME}} <button v-on:click="apply(index)">신청하기</button></h5> -->
        <h5>{{index + 1}} {{file.ORIGINAL_DATA_TYPE_ID}} {{file.TASK_NAME}} {{file.TOTAL_TUPLE_NUM}} {{file.NULL_RATIO}} {{file.DUPLICATE_TUPLE_NUM}}</h5>
    </div>
</div>   
</template>

<script>
export default {
    created(){
        if(this.$store.state.role!=='ASE'){
            alert("권한이 없습니다")
            this.$router.go(-1)
        } else {
            this.$http.get('/api/assessor/parsingevaluate')
            .then(res => {
                this.files = res.data
            })
        }
    },
    data: function(){
        return{
            files : [],
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