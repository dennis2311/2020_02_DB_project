<template>
    <div>
        <h3>스키마 선택</h3>
        <form v-on:submit="DefineOriginalDataType_Schema">
            <label for="name">original data type 이름</label>
            <input type="text" id="name" v-model="user.name">
            <br>
            <div>활용 가능 스키마 : {{taskData.TASK_TABLE_SCHEMA_INFO}}</div>
            <label for="OriginalDataSchemaInfo">original data type 스키마 정보</label>
            <input type="text" id="originalDataSchemaInfo" v-model="user.originalDataSchemaInfo">
            <br>     
             <small id="taskInfoMessage" class="form-text text-muted">attribute 사이는 콤마(,)로 연결하시오. ex) num,name</small>
            <br>
            <button>생성</button>
        </form>
    </div>
</template>

<script>
export default {
    created(){
        if(this.$store.state.role!=='ADM'){
            alert("권한이 없습니다")
            this.$router.go(-1)
        } else {
            var taskName = this.$route.params.taskName
            this.$http.get(`/api/admin/defineoriginaldatatype/${taskName}`)
            .then(res => {
                if(res.data){
                    this.taskData = res.data[0]
                } else {
                    this.$router.go(-1)
                    alert("서버 문제입니다. 계속되는 경우 관리자에게 문의하세요.")
                }
            })
            .catch(function(error){
                alert(error)
            })
        }
    },
    name : 'DefineOriginalDataType_Schema',
    data: function() {
        return {
            taskData: {},
            user:{
                name:'',
                originalDataSchemaInfo:'',
                task_name: this.$route.params.taskName
            }
        }
    },
    methods: {
        DefineOriginalDataType_Schema: function(event){
            event.preventDefault();
            this.$http.post(`/api/admin/create`,{
                user:this.user
            })
            .then(res => {
                alert(res.data.message);
                if(res.data.success){   
                    this.$router.push({name:'AdminPage'})
                }
            })
            .catch(function (error){
                alert(error);
            })
        }
    }
}
</script>