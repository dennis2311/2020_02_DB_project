<template>
<div>
    <h3>서비스 이용을 위하여 로그인 해주세요</h3>

    <form v-on:submit="login">
        <div class="input_row">
            <input type="text" id="id" placeholder="아이디" v-model="user.id">
        </div>

        <div class="input_row">
            <input type="password" id="password" placeholder="비밀번호" v-model="user.password">
        </div>

        <button>로그인</button>

    </form>
    
    <h4>또는</h4>

    <router-link to='/createaccount'>새 계정 만들기</router-link>

</div>
    
</template>

<script>
export default {
    name: 'LoginPage',
    data: function(){
        return{
            user:{
                id:'',
                password:''
            }
        }
    },
    methods:{
        login: function(event){
            event.preventDefault();
            this.$http.post('/api',{
                user : this.user
            })
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