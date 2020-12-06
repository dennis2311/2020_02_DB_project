<template>
<div>
    <h2>원본 데이터 파일을 업로드 해주세요</h2>
    <div>
        <table class='table table-dark' border='2px'>
            <thead>
                <tr>
                <th scope='col'> </th>
                <th scope='col'>NAME</th>
                <th scope='col'>승인여부</th>
                <th scope='col'> </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(task, index) in tasks" v-bind:key="task">
                    <td>{{index + 1}}</td>
                    <td>{{task.TASK_NAME}}</td>
                    <td>{{task.APPROVED}}</td>
                    <td>
                        <button @click="handle_toggle(task.TASK_NAME)" type="button"> 선택 </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <br/>
        <div v-show="is_show">
            <form @submit.prevent="sendFile" enctype="multipar/form-data">
                <div class="field">
                    <label for="file" class="label"> 파일 업로드 </label>
                    <input 
                        type="file"
                        ref="file"
                        @change="selectFile"
                    />
                </div>
            </form>
            <br/>
            <div class="input_row">
                <label for="Original Data Types">Choose Data Type:</label>
                <select v-model="selected">
                    <option v-for="type in OGDataType" v-bind:key="type.value">
                        {{ type.NAME }}
                    </option>
                </select>
                <span>Selected:{{ selected }}</span>
            </div>
            <div class="input_row">
                <label for="sessionNum">회차 입력:</label>
                <input type="number" id="sessionNum" placeholder="회차" v-model="sessionNum">
            </div>
            <div class="input_row">
                <label for="startDate">기간 시작:</label>
                <input type="date" id="periodStart" placeholder="시작시간" v-model="periodStart">
            </div>
            <div class="input_row">
                <label for="endDate">기간 종료:</label>
                <input type="date" id="periodEnd" placeholder="종료시간" v-model="periodEnd">
            </div>
            <button @click="loadTextFromFile" type="button"> 제출 </button>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'SubmitFilePage',

    created(){
        if(this.$store.state.role!=='SUB'){
            alert("권한이 없습니다")
            this.$router.go(-1)
        } else {
            var userid = this.$store.state.id;
            this.$http.get(`/api/submittee/approvedtasks/${userid}`)
            .then(res =>{
                this.tasks = res.data
                console.log(res.data)
            })
        }
    },
    data(){
        return{
            tasks : [],
            is_approved : false,
            is_show : false,
            file:'',
            sessionNum:'',
            selected:'',
            OGDataType:[],
            periodStart:'',
            periodEnd:''
        }
    },
    methods: {
        selectFile(){
            this.file=this.$refs.file.files[0]
            console.log(this.file)
        },
        loadTextFromFile(){
            const reader = new FileReader();
            reader.onload = e => console.log(e.target.result);
            reader.readAsText(this.file);
            alert('제출되었습니다.');
            console.log(this.sessionNum);
            console.log(this.periodStart);
            console.log(this.periodEnd);
        },
        handle_toggle(taskName){
            console.log(taskName)
            this.is_show = !this.is_show
            this.$http.get(`/api/submittee/selectedtask/${taskName}`)
            .then(res =>{
                console.log(res.data)
                this.OGDataType = res.data
            })
        }
    }      
}
</script>