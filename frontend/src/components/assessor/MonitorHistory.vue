<template>
<div>
    <h3>평가 내역 모니터링</h3>
    <div>
     <table class='table table-dark' border='2px'>
        <thead>
            <tr>
            <th scope='col'> </th>
            <th scope='col'>TASK NAME</th>
            <th scope='col'>STORE CONDITION</th>
            <th scope='col'>DATA QUALITY GRADE</th>
            <th scope='col'>SESSION NUM</th>
            <th scope='col'>START PERIOD</th>
            <th scope='col'>END PERIOD</th>
            <th scope='col'>TOTAL TUPLE NUM</th>
            <th scope='col'>NULL RATIO</th>
            <th scope='col'>DUPLICATE TUPLE NUM</th>
            </tr>
        </thead>
            <tbody>
                <tr v-for="(file, index) in files" v-bind:key="file">
                    <td>{{index + 1}}</td>
                    <td>{{file.TASK_NAME}}</td>
                    <td>{{file.STORE_CONDITION}}</td>
                    <td>{{file.DATA_QUALITY_GRADE}}</td>
                    <td>{{file.SESSION_NUM}}</td>
                    <td>{{file.PERIOD_START}}</td>
                    <td>{{file.PERIOD_END}}</td>
                    <td>{{file.TOTAL_TUPLE_NUM}}</td>
                    <td>{{file.NULL_RATIO}}</td>
                    <td>{{file.DUPLICATE_TUPLE_NUM}}</td>
            </tbody>
    </table>
    </div>
</div>
</template>

<script>
export default {
    name: 'MonitorHistory',
    created(){
        if(this.$store.state.role!=='ASE'){
            alert("권한이 없습니다")
            this.$router.go(-1)
        } else {
            this.$http.get('/api/assessor/monitorhistory')
            .then(res => {
                this.files = res.data
            })
            .catch(function(error){
                alert(error);
            })
        }
    },
    data(){
        return{
            files : [],
            is_approved : false

        }
    }
}
</script>