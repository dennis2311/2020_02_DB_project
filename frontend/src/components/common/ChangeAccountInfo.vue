<template>
    <div>
        <h3>회원정보 수정</h3>
        <h3>아이디: {{user.id}}</h3>
        <div class="input_row">
            <input type="text" id="name" :placeholder="user.name" v-model="user.name">
        </div>

        <div class="input_row">
                    <input type="date" id="birthdate" :placeholder="user.birthdate" v-model="user.birthdate">
        </div>

        <div class="input_row">
            <h3>현재 성별: {{user.gender}}</h3>
            <input type="radio" id="female" value="F" v-model="user.gender">
            <label for="Female">Female</label>
            <input type="radio" id="male" value="M" v-model="user.gender">
            <label for="Male">Male</label>
            <input type="radio" id="other" value="O" v-model="user.gender">
            <label for="Other">Other</label>
            <br>
        </div>

        <div class="input_row">
            <input type="text" id="address" :placeholder="주소" v-model="user.address">
        </div>

        <div class="input_row">
            <input type="text" id="phone" :placeholder="휴대전화" v-model="user.phone">
        </div>

        <button v-on:click="changeAccountInfo">수정</button>
    </div>
</template>

<script>
export default {
    created(){
        this.$http.post('/api/changeaccountinfo', {
            id: this.user.id,
            user : this.user,
            updating : this.updating
        })
        .then(res => {
            if(res.data.success){
                this.user.name = res.data.user.name
                this.user.birthdate = res.data.user.birthdate
                this.user.gender = res.data.user.gender
                this.user.address = res.data.user.address
                this.user.phone = res.data.user.phone
            } else {
                alert(res.data.message)
            }
        })
    },
    
    data: function() {
        return{
            user : {
                id : this.$store.state.id,
                name : null,
                birthdate : null,
                gender : null,
                address : null,
                phone : null,
            },
            updating : false
        }
    },
    methods: {
        changeAccountInfo(){
            this.updating = true
            this.$http.post('/api/changeaccountinfo',{
                id: this.user.id,
                user : this.user,
                updating : this.updating
            })
            .then(res => {
                if(res.data.success){
                    alert("성공적으로 변경되었습니다.");
                    this.user.name = res.data.user.name
                    this.user.birthdate = res.data.user.birthdate
                    this.user.gender = res.data.user.gender
                    this.user.address = res.data.user.address
                    this.user.phone = res.data.user.phone
                } else {
                    alert(res.data.message)
                }
            })
            .catch(function (error){
                alert('SOMETHING WRONG')
                alert(error);
            })
        }
    }
}
</script>