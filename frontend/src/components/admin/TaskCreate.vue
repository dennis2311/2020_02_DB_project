<template>
    <div>
        <h3>태스크 생성</h3>
        <form v-on:submit="taskCreate">
            <div class="form-group">
                <label for="taskName">테스크 이름</label>
                <input type="text" id="taskName" v-model="user.taskName">
            </div>

            <div class="form-group">
                <label for="taskDescription">테스크 설명</label>
                <input type="text" id="taskDescription" v-model="user.taskDescription">
            </div>

            <div class="form-group">
                <label for="min_upload_period">최소 업로드 주기 (일)</label>
                <input type="number" name="min_upload_period" min="0" max="100" step="10" v-model="user.min_upload_period">
            </div>

            <div class="form-group">
                <label for="taskTableName">테스크 데이터 테이블 이름</label>
                <input type="text" id="taskTableName" v-model="user.taskTableName">
            </div>

            <div class="form-group">
                <label for="taskTableSchemaInfo">테스크 데이터 테이블 스키마 정보 (,로 띄어 쓰시오)</label>
                <input type="text" id="taskTableSchemaInfo" v-model="user.taskTableSchemaInfo">
            </div>

            <button>테스크 생성</button>
        </form>
    </div>
</template>

<script>
export default {
    created(){
        if(this.$store.state.role!=='ADM'){
            alert("권한이 없습니다")
            this.$router.go(-1)
        }
    },
    name : 'TaskCreate',
    data: function() {
        return {
            user:{
                taskName:'',
                taskDescription:'',
                min_upload_period:'',
                taskTableName:'',
                taskTableSchemaInfo:''
            }
        }
    },
    methods: {
        taskCreate: function(event){
            event.preventDefault();
            this.$http.post('/api/admin/taskcreate',{
                user:this.user
            })
            .then(res => {
                alert(res.data.message);
                if(res.data.success){   
                    this.$router.push({name:'DefineOriginalDataType'})
                }
            })
            .catch(function (error){
                alert(error);
            })
        }
    }
}
</script>