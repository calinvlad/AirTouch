<template>
  <v-app>
    <v-toolbar class="mb-2">
    <v-toolbar-title>Test</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat :to="{name: 'users'}" v-if="isAdmin">Users</v-btn>
      <v-btn flat :to="{name: 'adminprojects'}" v-if="isAdmin">Projects Panel</v-btn>
      <v-btn flat :to="{name: 'profile', params: { username: user.username }}" v-if="isUserLoggedIn && !isAdmin">My profile</v-btn>
      <v-btn flat :to="{name: 'projects'}">Projects</v-btn>
      <v-btn flat :to="{name: 'register'}" v-if="!isUserLoggedIn || !isUserLoggedIn && !isAdmin">Register</v-btn>
      <v-btn flat :to="{name: 'login'}" v-if="!isUserLoggedIn || !isUserLoggedIn && !isAdmin">Login</v-btn>
      <v-btn flat @click="logout" v-if="isUserLoggedIn || isAdmin">Logout</v-btn>
    </v-toolbar-items>
    </v-toolbar>
    <router-view/>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['isUserLoggedIn', 'isAdmin', 'user'])
  },
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'projects'
      })
    }
  }
}
</script>

<style lang="scss">
.flex.offset-xs3 {
  margin-right: 25%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
