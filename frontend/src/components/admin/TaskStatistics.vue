<template>
    <h5>태스크 통계</h5>
</template>

<script>

// 관리자는 각 태스크 별로 전체 제출된 파일 수와 
// pass되어 태스크 데이터 테이블에 저장된 tuple 수를 확인할 수 있다. 
// 또한 이를 원본 데이터 타입 수준에서도 볼 수 있다.
// 또한 각 태스크에 참여중인 제출자들의 목록을 살펴 볼 수 있다. 
// 이때 제출자를 개별 선택하면 각 제출자가 참여중인 태스크 등을 확인할 수 있다.
export default {
    created(){
        if(this.$store.state.role!=='ADM'){
            alert("권한이 없습니다")
            this.$router.go(-1)
        }  else {
            this.$http.post('/api/admin/taskstatistics',{
            })
            .then(res => {
                if(res.data.success){
                }
                else{
                    alert(res.data.message)
                }
            })
        }
    },
    name : 'TaskStatistics'
}
</script>