<template>
<div>
    <div v-for="user in users" v-bind:key="user">
        {{user.ID}}
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
                alert(`데이터 수신 완료 ${res.data[0]}`)
                this.users = res.data
            })
        }
    },
    data: function(){
        return{
            users : []
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
                    this.$store.commit('logIn', res.data);
                    this.$router.push(`/${role(res.data.role)}`);
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