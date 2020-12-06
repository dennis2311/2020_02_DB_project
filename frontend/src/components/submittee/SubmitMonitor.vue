<!-- The page which monior total submit status and verify each evaluation scores. -->
<template>
<div>
    <h3>제출 현황 모니터링 및 평가 점수 확인 페이지</h3>
    <div>
        <h4> ID : {{id}} </h4>
        <h3>   현재 평가 점수 : {{evalGrade[0]}} </h3>
    </div>
            
    <div>

        <h5 > 현재 참여 중인 태스크의 현황 보기 </h5>

        <div v-for="(task, index) in tasks" v-bind:key="task">
            <h2 > {{index+1}}. 태스크 이름 : {{task[index].NAME}} </h2>

            <!-- <h2 v-for="(task, index) in tasks" v-bind:key="task"> task {{index}} </h2> -->
                <h5> 제출한 파일 수 : {{fileNumByTask[index]}} </h5> 
                <h5> pass되어 저장된 tuple 수 : {{storedTuplesNum[index]}}  </h5>

                <h3> 원본 데이터 타입 현황 및 해당 파싱 데이터 시퀀스 파일 현황 </h3>
                <div v-for="(aorgFilePresent) in orgFilePresent[index]" v-bind:key="aorgFilePresent">     
                    <table class='table table-dark' border='2px'>
                            
                            <thead >
                                <tr>
                                    <!-- <th scope='col'> 순서 </th> -->
                                    <th scope='col'> 원본 데이터 타입 ID </th>
                                    <th scope='col'> 태스크 데이터 테이블 매핑 정보 </th>
                                    <th scope='col'> 스키마 정보 </th>
                                    <th scope='col'> 태스크 이름 </th>
                                </tr>   
                            </thead>
                                <!-- {{orgFilePresent}} -->
                                <tbody>
                                    <tr >
                                        <!-- <td> {{index1+1}} </td> -->
                                        <td> {{aorgFilePresent.ID}} </td>
                                        <td> {{aorgFilePresent.NAME}} </td>
                                        <td> {{aorgFilePresent.SCHEMA_INFO}} </td>
                                        <td> {{aorgFilePresent.TASK_NAME}} </td>
                                        </tr>
                                </tbody>
                    </table>

                    <div v-for="(aPDSFFilePresend) in PDSFFilePresend" v-bind:key="aPDSFFilePresend">
                        <div v-for="(aaPDSFFilePresend) in aPDSFFilePresend" v-bind:key="aaPDSFFilePresend">
                        <table class='table table-dark' border='2px'>
                                    <thead>
                                        <tr>
                                            <th scope='col'> 회차 정보 </th>
                                            <th scope='col'> TASK ID </th>
                                            <th scope='col'> 원본 데이터 타입 ID </th>
                                            <th scope='col'> TASK 이름 </th>
                                            <th scope='col'> 평가 상태 </th>
                                            <th scope='col'> 저장 상태 (PASS/NONPASS 여부) </th>
                                            <th scope='col'> 데이터 품질 점수 </th>
                                            <th scope='col'> 시작 날짜 </th>
                                            <th scope='col'> 종료 날짜 </th>
                                            <th scope='col'> 총 튜플 수 </th>
                                            <th scope='col'> null 비율 </th>
                                            <th scope='col'> 중복 튜플 수 </th>
                                            <th scope='col'> 배당된 평가자 ID </th>
                                            <th scope='col'> 제출자 ID </th>
                                            <th scope='col'> 원본 데이터 시퀀스 파일 회차 번호 </th>
                                        </tr>   
                                    </thead>
                                        <tbody>
                                                <tr>
                                                    <td> {{aaPDSFFilePresend.SESSION_NUM}} </td>
                                                    <td> {{aaPDSFFilePresend.ID}} </td>
                                                    <td> {{aaPDSFFilePresend.ORIGINAL_DATA_TYPE_ID}} </td>
                                                    <td> {{aaPDSFFilePresend.TASK_NAME}} </td>
                                                    <td> {{aaPDSFFilePresend.EVALUATION_STATE}} </td>
                                                    <td> {{aaPDSFFilePresend.STORE_CONDITION}} </td>
                                                    <td> {{aaPDSFFilePresend.DATA_QUALITY_GRADE}} </td>
                                                    <td> {{aaPDSFFilePresend.PERIOD_START}} </td>
                                                    <td> {{aaPDSFFilePresend.PERIOD_END}} </td>
                                                    <td> {{aaPDSFFilePresend.TOTAL_TUPLE_NUM}} </td>
                                                    <td> {{aaPDSFFilePresend.NULL_RATIO}} </td>
                                                    <td> {{aaPDSFFilePresend.DUPLICATE_TUPLE_NUM}} </td>
                                                    <td> {{aaPDSFFilePresend.ASSESSOR_ID}}
                                                    <td> {{id}} </td>
                                                    <td> {{aaPDSFFilePresend.OGDSF_SERIAL_NUM}} </td>
                                                </tr>
                                        </tbody>
                        </table>
                    </div>
                </div>
        </div>
                
    </div>
</div>   
</template>

<script>
export default {

    created(){
        // let $vm = this; 
        if(this.$store.state.role!=='SUB'){
            alert("권한이 없습니다")
            this.$router.go(-1)
        } else {
            this.params.userid = this.$store.state.id;

            this.$http.post(`/api/submittee/submonitor`,{
                params:this.params
            })           
            .then(res => {
                 if(res.data){
                    this.tasks = res.data.tasks
                    this.evalGrade = res.data.evalGrade
                    this.fileNumByTask = res.data.fileNumByTask
                    this.storedTuplesNum = res.data.storedTuplesNum
                    this.orgFilePresent = res.data.orgFilePresent
                    this.PDSFFilePresend = res.data.PDSFFilePresend

                } else {
                    this.$router.go(-1)
                    alert("서버 문제입니다. 계속되는 경우 관리자에게 문의하세요.")
                }
            })
        }
    },
    data: function(){
        return{

            params:{
                userid:'',

            },

            evalGrade:5,
            id: this.$store.state.id,
            tasks : [],
            fileNumByTask:[],
            storedTuplesNum:[],
            orgFilePresent :[],
            PDSFFilePresend : []
        }

    },

    methods:{

        getTaskFile() {
            this.$http.post(`/api/submittee/submonitor`,{
                params:this.params
            })
            .then(res => {
                if(res.data){
                    this.tasks = res.data
                } else {
                    this.$router.go(-1)
                    alert("서버 문제입니다. 계속되는 경우 관리자에게 문의하세요.")
                }
            });
        }
    }
}

</script>

