<template>
    <div>
    <h3>이 작업은 되돌릴 수 없습니다. 정말로 탈퇴를 원하시면 한번 더 비밀번호를 입력해주세요.</h3>
        <form v-on:submit="signout">
            <div class="input_row">
                <input type="password" id="password" placeholder="비밀번호" v-model="user.password">
            </div>
            <button>탈퇴하기</button>
        </form>
    </div>
</template>

<script>
export default {
    created(){
        if(this.$store.state.role==='ADM'){
            alert("관리자님 여기서 뭐하세요")
            this.$router.push('/admin')
        }
    },
    data: function(){
        return{
            user : {
                id : this.$store.state.id,
                password : ''
            }
        }
    },
    methods:{
        signout: function(event){
            event.preventDefault();
            this.$http.post('/api/signout',{
                user:this.user
            })
            .then(res => {
                alert(res.data.message);
                if(res.data.success){   
                    this.$router.push('/')
                }
            })
            .catch(function (error){
                alert(error);
            })
        }
    }
}
</script>

<style scoped>

</style>