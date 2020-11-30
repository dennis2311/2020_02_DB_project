<template>
    <div>
        <h3>회원정보 수정</h3>
        <form v-on:submit="changeAccountInfo">
            <div class="input_row">
                <input type="password" id="current_password" placeholder="현재 비밀번호" v-model="user.current_password">
            </div>

            <div class="input_row">
                <input type="password" id="new_password" placeholder="새 비밀번호" v-model="user.new_password">
            </div>

            <div class="input_row">
                <input type="password" id="new_password_confirm" placeholder="새 비밀번호 확인" v-model="user.new_password_confirm">
            </div>

            <button>변경</button>
        </form>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            user:{
                current_password:'',
                new_password:'',
                new_password_confirm:'',
                id: this.$store.state.id
            }
        }
    },
    methods: {
        changeAccountInfo: function(event){
            event.preventDefault();
            this.$http.post('/api/changeaccountinfo',{
                user:this.user

            })
            .then(res => {
                alert(res.data.message);
                if(res.data.success){   
                    this.$router.push({name:'LoginPage'})
                }
            })
            .catch(function (error){
                alert(error);
            })
        }
    }
}
</script>