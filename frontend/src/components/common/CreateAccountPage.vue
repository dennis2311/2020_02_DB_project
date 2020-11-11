<template>
    <div>
        <h1>Create new Account</h1>
        <form v-on:submit="signUp">
            <div class="input_row">
                <input type="text" id="id" placeholder="id" v-model="user.userid">
            </div>

            <div class="input_row">
                <input type="text" id="name" placeholder="name" v-model="user.name">
            </div>

            <div class="input_row">
                <input type="password" id="password" placeholder="password" v-model="user.password">
            </div>

            <button>SIGNUP</button>
        </form>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            user:{
                userid:'',
                name:'',
                password:''
            }
        }
    },
    methods: {
        signUp: function(event){
            event.preventDefault();
            this.$http.post('/api/createAccount',{
                user:this.user
            })
            .then(res => {
                if(res.data.success == true){
                    alert(res.data.message);
                    this.$router.push({name:'LoginPage'})
                }
                if (res.data.success == false){
                    alert(res.data.message);
                }
            })
            .catch(function (error){
                alert(error);
            })
        }
    }
}
</script>