<template>
<div>
    <h4>태스크 통계</h4>
    <h5>태스크:
    <select v-model="task_file_num">
        <option v-for="task in task_names" :key="task">{{task}}</option>
    </select>
    <button v-on:click="case1">전체 파일 수 확인</button>
    </h5>

    <h5>태스크:
    <select v-model="task_count_tuple">
        <option v-for="task in task_names" :key="task">{{task}}</option>
    </select>
    <button v-on:click="case2">저장 tuple 수 확인</button>
    </h5>

    <h5>원본 데이터 타입:
    <select v-model="orgdt_file_num">
        <option v-for="id in orgdt_ids" :key="id">{{id}}</option>
    </select>
    <button v-on:click="case3">전체 파일 수 확인</button>
    </h5>
    
    <h5>원본 데이터 타입:
    <select v-model="orgdt_count_tuple">
        <option v-for="id in orgdt_ids" :key="id">{{id}}</option>
    </select>
    <button v-on:click="case4">저장 tuple 수 확인</button>
    </h5>
    
    <h5>태스크:
    <select v-model="sub_per_task">
        <option v-for="task in task_names" :key="task">{{task}}</option>
    </select>
    <button v-on:click="case5">제출자 목록 확인</button>
    </h5>

    <h5>제출자:
    <select v-model="task_per_sub">
        <option v-for="id in sub_ids" :key="id">{{id}}</option>
    </select>
    <button v-on:click="case6">태스크 목록 확인</button>
    </h5>

</div>
</template>

<script>

// 관리자는 각 태스크 별로 전체 제출된 파일 수와 --> ORIGINAL DATA TYPE 에서 접근
// pass되어 태스크 데이터 테이블에 저장된 tuple 수를 확인할 수 있다. --> TASK DATA TABLE 에서 접근
// 또한 이를 원본 데이터 타입 수준에서도 볼 수 있다. --> 
// 또한 각 태스크에 참여중인 제출자들의 목록을 살펴 볼 수 있다. 
// 이때 제출자를 개별 선택하면 각 제출자가 참여중인 태스크 등을 확인할 수 있다.
export default {
    created(){
        if(this.$store.state.role!=='ADM'){
            alert("권한이 없습니다")
            this.$router.go(-1)
        }  else {
            this.$http.get('/api/admin/taskstatistics')
            .then(res => {
                if(res.data.success){
                    this.task_names = res.data.task_names
                    this.orgdt_ids = res.data.orgdt_ids
                    this.sub_ids = res.data.sub_ids
                }
                else{
                    alert(res.data.message)
                }
            })
        }
    },

    data: function() {
        return {
            task_names : [],
            orgdt_ids : [],
            req_case : 0,
            task_file_num : null,
            task_count_tuple : null,
            orgdt_file_num : null,
            orgdt_count_tuple : null,
            sub_per_task : null,
            task_per_sub : null
        }
    },

    methods : {
        case1(){
            event.preventDefault();
            this.req_case = 1
            // this.task_file_num = null
            this.task_count_tuple = null
            this.orgdt_file_num = null
            this.orgdt_count_tuple = null
            this.sub_per_task = null
            this.task_per_sub = null
            this.$http.post("/api/admin/taskstatistics_click",{
                req_case : this.req_case,
                task_file_num : this.task_file_num,
                task_count_tuple : this.task_count_tuple,
                orgdt_file_num : this.orgdt_file_num,
                orgdt_count_tuple : this.orgdt_count_tuple,
                sub_per_task : this.sub_per_task,
                task_per_sub : this.task_per_sub 
            })
            .then(res => {
                alert(res.data.message)
            })
        },
        case2(){
            this.req_case = 2
            event.preventDefault();
            this.task_file_num = null
            // this.task_count_tuple = null
            this.orgdt_file_num = null
            this.orgdt_count_tuple = null
            this.sub_per_task = null
            this.task_per_sub = null
            this.$http.post("/api/admin/taskstatistics_click",{
                req_case : this.req_case,
                task_file_num : this.task_file_num,
                task_count_tuple : this.task_count_tuple,
                orgdt_file_num : this.orgdt_file_num,
                orgdt_count_tuple : this.orgdt_count_tuple,
                sub_per_task : this.sub_per_task,
                task_per_sub : this.task_per_sub 
            })
            .then(res => {
                alert(res.data.message)
            })
        },
        case3(){
            event.preventDefault();
            this.req_case = 3
            this.task_file_num = null
            this.task_count_tuple = null
            // this.orgdt_file_num = null
            this.orgdt_count_tuple = null
            this.sub_per_task = null
            this.task_per_sub = null
            this.$http.post("/api/admin/taskstatistics_click",{
                req_case : this.req_case,
                task_file_num : this.task_file_num,
                task_count_tuple : this.task_count_tuple,
                orgdt_file_num : this.orgdt_file_num,
                orgdt_count_tuple : this.orgdt_count_tuple,
                sub_per_task : this.sub_per_task,
                task_per_sub : this.task_per_sub 
            })
            .then(res => {
                alert(res.data.message)
            })
        },
        case4(){
            event.preventDefault();
            this.req_case = 4
            this.task_file_num = null
            this.task_count_tuple = null
            this.orgdt_file_num = null
            // this.orgdt_count_tuple = null
            this.sub_per_task = null
            this.task_per_sub = null
            this.$http.post("/api/admin/taskstatistics_click",{
                req_case : this.req_case,
                task_file_num : this.task_file_num,
                task_count_tuple : this.task_count_tuple,
                orgdt_file_num : this.orgdt_file_num,
                orgdt_count_tuple : this.orgdt_count_tuple,
                sub_per_task : this.sub_per_task,
                task_per_sub : this.task_per_sub 
            })
            .then(res => {
                alert(res.data.message)
            })
        },
        case5(){
            event.preventDefault();
            this.req_case = 5
            this.task_file_num = null
            this.task_count_tuple = null
            this.orgdt_file_num = null
            this.orgdt_count_tuple = null
            // this.sub_per_task = null
            this.task_per_sub = null
            this.$http.post("/api/admin/taskstatistics_click",{
                req_case : this.req_case,
                task_file_num : this.task_file_num,
                task_count_tuple : this.task_count_tuple,
                orgdt_file_num : this.orgdt_file_num,
                orgdt_count_tuple : this.orgdt_count_tuple,
                sub_per_task : this.sub_per_task,
                task_per_sub : this.task_per_sub 
            })
            .then(res => {
                alert(res.data.message)
            })
        },
        case6(){
            event.preventDefault();
            this.req_case = 6
            this.task_file_num = null
            this.task_count_tuple = null
            this.orgdt_file_num = null
            this.orgdt_count_tuple = null
            this.sub_per_task = null
            // this.task_per_sub = null
            this.$http.post("/api/admin/taskstatistics_click",{
                req_case : this.req_case,
                task_file_num : this.task_file_num,
                task_count_tuple : this.task_count_tuple,
                orgdt_file_num : this.orgdt_file_num,
                orgdt_count_tuple : this.orgdt_count_tuple,
                sub_per_task : this.sub_per_task,
                task_per_sub : this.task_per_sub 
            })
            .then(res => {
                alert(res.data.message)
            })
        }
    },
    name : 'TaskStatistics'
}
</script>