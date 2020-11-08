<template>
  <div class="users">
    <h1>Users</h1>
    <ul>
        <li v-for="user in users" v-bind:key="user">
            {{user.username}}
            <img v-bind:src="user.profile">
            <router-link :to="{name:'UserDetailPage', params:{id:user.id}}">about this user..</router-link>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  created () {
    this.$http.get('/api/users')
    .then((response) => {
      this.users = response.data;
    })
  },
  data () {
    return {
      users: []
    }
  }
}
</script>