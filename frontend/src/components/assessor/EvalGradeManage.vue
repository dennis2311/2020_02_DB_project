<!-- The page which shows the parsing data sequence files allocated to user 
and receives the qualitative evaluation of parsing data sequence files . -->

<template>
<div>
    <div>
        <h3> 제출자의 평가 점수 관리 페이지 </h3>
        <h4> 할당된 파일 중 평가 완료된 파싱 데이터 시퀀스 파일들에 대해 정성 및 정량 평가가 완료되어, 제출자의 평가 점수를 계산하였습니다. </h4>
    </div>
    <div>
        <h5> 평가 점수 계산 방법</h5>
        <h5> 정성 평가 : 각 파싱 데이터 시퀀스 파일에 대해 평가자가 내린 평가 </h5>
        <h5> 정량 평가 : 각 파싱 데이터 시퀀스 파일에 대해 시스템이 내린 평가( 정량 평가 = ( 1 - ( null 비율 * 0.1) ) * (1 - (중복 튜플 수 / 전체 튜플 수)) * 10 )</h5>
        <h5> 평가 점수 : 각 파일의 정성 평가와 정량 평가의 합의 평균 </h5>
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
            this.params.asrID = this.$store.state.id;

            this.$http.post('/api/assessor/evalgrademanage',{
                params: this.params
            })
            .then(res => {
                if(res.data){
                    this.pdsFiles = res.data.pdsFiles
                    this.submiteeID = res.data.submiteeID
                    this.assessAll = res.data.assessAll
                    this.pdsFilesForSubmitee = res.data.pdsFilesForSubmitee
                    this.success = res.data.success
                    this.message = res.data.message
                } else {
                    this.$router.go(-1)
                    alert("서버 문제입니다. 계속되는 경우 관리자에게 문의하세요.")
                }
            })
            .catch(function(error){
                alert(error);
            })

        }
    },

     data: function(){
        return{
 
            params: {
                asrID:'', //assessor id
            },

            pdsFiles: [], // parsing data sequence files of the submitee
            submiteeID: [],
            assessAll: false,
        }
    },

    methods:{
   
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