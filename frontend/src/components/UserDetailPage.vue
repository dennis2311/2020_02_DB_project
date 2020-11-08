<template>
  <div class="user_detail">
    <h1>User Detail</h1>
    <p>
        <span>USERNAME : {{user.username}}</span>
        <span>ROLE : {{user.role}}</span>
        <img v-bind:src="user.profile">
    </p>
  </div>
</template>

<script>
export default {
  created: function () {
    var id = this.$route.params.id
    this.$http.get(`/api/users/${id}`)
    .then((response) => {
      this.user = response.data
    })
  },
  data: function () {
    return {
      user: {}
    }
  }
}
</script>