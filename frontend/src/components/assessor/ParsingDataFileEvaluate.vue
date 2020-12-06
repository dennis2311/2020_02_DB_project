<!-- The page which shows the parsing data sequence files allocated to user 
and receives the qualitative evaluation of parsing data sequence files . -->

<template>
<div>
    <h3>파싱 데이터 시퀀스 파일 정성평가 페이지</h3>
    <h5> 1 ~ 10 까지의 평가점수를 입력하여 제출해주세요
    <table class='table table-dark' border='2px'>
        <thead>
            <tr>
            <th scope='col'> </th>
            <th scope='col'>ORIGINAL_DATA_TYPE_ID</th>
            <th scope='col'>TASK_NAME</th>
            <th scope='col'>TOTAL_TUPLE_NUM</th>
            <th scope='col'>NULL_RATIO</th>
            <th scope='col'>DUPLICATE_TUPLE_NUM</th>
            <th scope='col'>평가</th>
            </tr>
        </thead>
            <tbody>
                <tr v-for="(file, index) in files" v-bind:key="file">
                    <td>{{index + 1}}</td>
                    <td>{{file.ORIGINAL_DATA_TYPE_ID}}</td>
                    <td>{{file.TASK_NAME}}</td>
                    <td>{{file.TOTAL_TUPLE_NUM}}</td>
                    <td>{{file.NULL_RATIO}}</td>
                    <td>{{file.DUPLICATE_TUPLE_NUM}}</td>
                    <td>
                        <select v-model="selected[index]">
                            <option v-for="score in scores" v-bind:key="score.value">
                                {{ score.text }}
                            </option>
                        </select>
                        <button v-on:click="apply(index)"> 제출 </button>
                    </td>
                </tr>
            </tbody>
    </table>
</div>   
</template>

<script>
export default {

       created(){
        let $vm = this; 
        if(this.$store.state.role!=='ASE'){
            alert("권한이 없습니다")
            this.$router.go(-1)
        } else {
            var userid = this.$store.state.id;
            this.$http.get(`/api/assessor/parsingevaluate/${userid}`)
            .then(res => {
                this.files = res.data
                for(var i=0; i<(res.data).length; i++){
                    $vm.selected.push(5)
                }
            })
            .catch(function(error){
                alert(error);
            })

        }
    },

     data: function(){
        return{
            files : [],
            selected : [],
            scores: [
                { text : 10, value : 10},
                { text : 9, value : 9},
                { text : 8, value : 8},
                { text : 7, value : 7},
                { text : 6, value : 6},
                { text : 5, value : 5},
                { text : 4, value : 4},
                { text : 3, value : 3},
                { text : 2, value : 2},
                { text : 1, value : 1}
            ],
            params: {
                userid:'',
                selected_score:0,
                fileid:0,
                taskname:'',
                original_data_type_id:0
            }
        }
    },

    methods:{
       apply(index){
           this.params.userid = this.$store.state.id;
           this.params.selected_score = this.selected[index];
           this.params.fileid = this.files[index].ID;
           this.params.taskname = this.files[index].TASK_NAME;
           this.params.original_data_type_id = this.files[index].ORIGINAL_DATA_TYPE_ID;

           this.$http.post(`/api/assessor/parsingevaluate`,{
               params:this.params
           })
           .then(res => {
                alert(res.data.message);
            })
            .catch(function(error){
                alert(error);
            })
       }
    }
}
</script>

<style>
    table{
        width: 80%;
        height: 100px;
        margin: auto;
        text-align: center;
    }
</style>