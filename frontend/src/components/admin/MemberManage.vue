<template>
<div>
    <br>
    <h3>가입 유저 목록입니다. 클릭 시 상세 보기로 넘어갑니다.</h3>
    <h3>아래 조건으로 검색할 수 있습니다.</h3>
    <br><br>
    <input type="radio" id="role" value="ROLE" v-model="sort">
    <label for="ROLE">역할</label>
    <input type="radio" id="age" value="AGE" v-model="sort">
    <label for="AGE">나이</label>
    <input type="radio" id="gender" value="GENDER" v-model="sort">
    <label for="GENDER">성별</label>
    <input type="radio" id="task" value="TASK" v-model="sort">
    <label for="TASK">참여 태스크</label>
    <input type="radio" id="id" value="ID" v-model="sort">
    <label for="ID">ID</label>
    <button v-on:click="showALL">전체보기</button>

    <div v-if="sort==='ROLE'">
        <button v-on:click="showASE">평가자만 보기</button>
        <button v-on:click="showSUB">제출자만 보기</button>
    </div>
    <div v-if="sort==='AGE'">
        <input type="text" id="id" placeholder="최소 나이" v-model="minAge">이상 
        <input type="text" id="id" placeholder="최대 나이" v-model="maxAge">이하 
        <button v-on:click="searchAGE">검색</button>
    </div>
    <div v-else-if="sort==='GENDER'">
        <button v-on:click="showMALE">남성만 보기</button>
        <button v-on:click="showFEMALE">여성만 보기</button>
        <button v-on:click="showOTHER">그 외 성별만 보기</button>
    </div>
    <div v-else-if="sort==='ID'">
        <input type="text" id="id" placeholder="아이디" v-model="searchID">
        <button v-on:click="findById">검색</button>
    </div>
    <div v-else-if="sort==='TASK'">
        <select v-model="searchTASK">
            <option v-for="task in taskNames" v-bind:value="task.NAME" v-bind:key="task.NAME">
                {{ task.NAME }}
            </option>
        </select>
        <button v-on:click="findByTask">검색</button>
    </div>
    
    <br>
    <div v-if="isUserMatch">
        <div v-for="user in users_shown" v-bind:key="user">
            <router-link :to="{name:'MemberManage_Each', params:{id:user.ID}}">{{user.ID}} ({{user.ROLE}})</router-link>
        </div>
    </div>
    <div v-else>
        <h4>[조건에 맞는 사용자가 없습니다]</h4>
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
            this.$http.get('/api/admin/membermanage')
            .then(res => {
                this.users = res.data
                this.users_shown = this.users
            })
            this.$http.get('/api/admin/membermanage_task')
            .then(res=>{
                this.tasks = res.data
            })
            this.$http.get('/api/admin/membermanage_taskname')
            .then(res=>{
                this.taskNames = res.data
            })
        }
    },
    data: function(){
        return{
            users : [],
            tasks : [],
            taskNames : [],
            users_shown : [],
            isUserMatch : true,
            minAge : 0,
            maxAge : 200,
            searchID : '',
            searchTASK : '',
            sort : ''
        }
    },
    methods:{
        showALL:function(event){
            evnet.preventDefault()
            this.users_shown = this.users
        },
        showASE:function(event){
            event.preventDefault()
            this.users_shown = []
            for(var i = 0 ; i<this.users.length ; i++){
                if(this.users[i].ROLE==='ASE'){
                    this.users_shown.push(this.users[i])
                }
            }
            if(this.users_shown.length===0){
                this.isUserMatch = false
            } else {
                this.isUserMatch = true
            }
        },
        showSUB:function(event){
            event.preventDefault()
            this.users_shown = []
            for(var i = 0 ; i<this.users.length ; i++){
                if(this.users[i].ROLE==='SUB'){
                    this.users_shown.push(this.users[i])
                }
            }
            if(this.users_shown.length===0){
                this.isUserMatch = false
            } else {
                this.isUserMatch = true
            }
        },
        searchAGE:function(event){
            event.preventDefault()
            const year = new Date().getFullYear()
            this.users_shown = []
            for(var i = 0 ; i<this.users.length ; i++){
                if(this.users[i].BIRTHDATE===null){
                    continue
                } else {
                    var userYear = this.users[i].BIRTHDATE.substring(0,4)*1
                    if(this.minAge <= userYear-year+1 <= this.maxAge){
                        this.users_shown.push(this.users[i])
                    }
                }
            }
            this.minAge = 0
            this.maxAge = 200
            if(this.users_shown.length===0){
                this.isUserMatch = false
            } else {
                this.isUserMatch = true
            }
        },
        showMALE:function(event){
            event.preventDefault()
            this.users_shown = []
            for(var i = 0 ; i<this.users.length ; i++){
                if(this.users[i].GENDER==='M'){
                    this.users_shown.push(this.users[i])
                }
            }
            if(this.users_shown.length===0){
                this.isUserMatch = false
            } else {
                this.isUserMatch = true
            }
        },
        showFEMALE:function(event){
            event.preventDefault()
            this.users_shown = []
            for(var i = 0 ; i<this.users.length ; i++){
                if(this.users[i].GENDER==='F'){
                    this.users_shown.push(this.users[i])
                }
            }
            if(this.users_shown.length===0){
                this.isUserMatch = false
            } else {
                this.isUserMatch = true
            }
        },
        showOTHER:function(event){
            event.preventDefault()
            this.users_shown = []
            for(var i = 0 ; i<this.users.length ; i++){
                if(this.users[i].GENDER==='O'){
                    this.users_shown.push(this.users[i])
                }
            }
            if(this.users_shown.length===0){
                this.isUserMatch = false
            } else {
                this.isUserMatch = true
            }
        },
        findById:function(event){
            event.preventDefault()
            this.users_shown = []
            for(var i = 0 ; i<this.users.length ; i++){
                if(this.users[i].ID===this.searchID){
                    this.users_shown.push(this.users[i])
                }
            }
            if(this.users_shown.length===0){
                this.isUserMatch = false
            } else {
                this.isUserMatch = true
            }
        },
        findByTask:function(event){
            event.preventDefault()
            this.users_shown = []
            for(var i = 0 ; i<this.tasks.length ; i++){
                if(this.tasks[i].NAME===this.searchTASK){
                    this.users_shown.push(this.tasks[i])
                }
            }
            if(this.users_shown.length===0){
                this.isUserMatch = false
            } else {
                this.isUserMatch = true
            }
        },
    }
}
</script>

<style scoped>
    h1, h2 {
    font-weight: normal;
    }
    ul {
    list-style-type: none;
    padding: 0;
    }
    li {
    display: inline-block;
    margin: 0 10px;
    }
    a {
    color: #42b983;
    }
</style>