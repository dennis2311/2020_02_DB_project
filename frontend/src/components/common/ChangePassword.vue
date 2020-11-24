<template>
    <div>
        <h3>비밀번호 변경</h3>
        <form v-on:submit="changePassword">
            <div class="input_row">
                <input type="text" id="id" placeholder="현재 비밀번호" v-model="user.current_password">
            </div>

            <div class="input_row">
                <input type="password" id="password" placeholder="새 비밀번호" v-model="user.new_password">
            </div>

            <div class="input_row">
                <input type="password" id="password_confirm" placeholder="새 비밀번호 확인" v-model="user.new_password_confirm">
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
            }
        }
    },
    methods: {
        signUp: function(event){
            event.preventDefault();
            this.$http.post('/api/changepassword',{
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