<template>
    <div>
        <h1>계정 생성</h1>
        <form v-on:submit="signUp">
            <div class="input_row">
                <input type="text" id="id" placeholder="아이디" v-model="user.id">
            </div>

            <div class="input_row">
                <input type="password" id="password" placeholder="비밀번호" v-model="user.password">
            </div>

            <div class="input_row">
                <input type="password" id="password_confirm" placeholder="비밀번호 확인" v-model="user.password_confirm">
            </div>

            <div class="input_row">
                <input type="text" id="name" placeholder="이름" v-model="user.name">
            </div>

            <div class="input_row">
                     <input type="date" id="birthdate" placeholder="생년월일" v-model="user.birthdate">
            </div>

            <div class="input_row">
                <input type="radio" id="female" value="F" v-model="user.gender">
                <label for="Female">Female</label>
                <input type="radio" id="male" value="M" v-model="user.gender">
                <label for="Male">Male</label>
                <input type="radio" id="other" value="O" v-model="user.gender">
                <label for="Other">Other</label>
                <br>
            </div>

            <div class="input_row">
                <input type="text" id="address" placeholder="주소" v-model="user.address">
            </div>

            <div class="input_row">
                <input type="text" id="phone" placeholder="휴대전화" v-model="user.phone">
            </div>

            <div class="input_row">
                <input type="radio" id="submittee" value="SUB" v-model="user.role">
                <label for="제출자">제출자</label>
                <br>
                <input type="radio" id="assessor" value="ASE" v-model="user.role">
                <label for="평가자">평가자</label>
                <br>
            </div>

            <button>가입하기</button>
        </form>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            user:{
                id:'',
                password:'',
                password_confirm:'',
                name:'',
                birthdate:'',
                gender:'',
                address:'',
                phone:'',
                role:''
            }
        }
    },
    methods: {
        signUp: function(event){
            event.preventDefault();
            this.$http.post('/api/createaccount',{
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