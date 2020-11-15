<template>
<div>
    <h3>Please login for service</h3>

    <form v-on:submit="login">
        <div class="input_row">
            <input type="text" id="id" placeholder="id" v-model="user.userid">
        </div>

        <div class="input_row">
            <input type="password" id="password" placeholder="password" v-model="user.password">
        </div>

        <button>LOGIN</button>

    </form>
    
    <h4>or</h4>

    <router-link to='/createaccount'>create new account</router-link> |
    <router-link to='/findaccount'>forgot ID/password?</router-link>

</div>
    
</template>

<script>
export default {
    name: 'LoginPage',
    data: function(){
        return{
            user:{
                userid:'',
                password:''
            }
        }
    },
    methods:{
        login: function(event){
            event.preventDefault();
            this.$http.post('/api',
                {user : this.user})
            .then(res => {
                alert(res.data.message);
                if(res.data.success){
                    this.$router.push(`/${res.data.role}`);
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