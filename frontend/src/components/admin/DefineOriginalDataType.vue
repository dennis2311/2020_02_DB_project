<template>
    <div>
        <h3>오리지널 데이터 타입 생성</h3>
        <label for="taskName">해당 타입 테스크 이름 선택</label>
        <div v-for="task in tasks" v-bind:key="task">
            <router-link :to="{name:'DefineOriginalDataType_Schema', params:{taskName:task.NAME}}">{{task.NAME}}</router-link>
         </div>
    </div>
</template>

<script>
export default { 
    created(){
        if(this.$store.state.role!=='ADM'){
            alert("권한이 없습니다")
            this.$router.go(-1)
        } else {
            this.$http.get('/api/admin/defineoriginaldatatype')
            .then(res => {
                this.tasks = res.data
            })
        }
    },
    name : 'DefineOriginalDataType',
    data: function() {
        return {
            tasks:[]
        }
    }
}
</script>