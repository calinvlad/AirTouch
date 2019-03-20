<template>
  <v-layout mt-5>
    <v-flex xs-6 offset-xs3>
      <form>
        <v-text-field
          v-model="username"
          label="Username"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          required
        ></v-text-field>
        <div class="danger-alert mb-3" v-html="error"></div>
        <v-btn @click="login">submit</v-btn>
      </form>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthService from '@/services/AuthService'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['isAdmin'])
  },
  data () {
    return {
      username: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthService.login({
          username: this.username,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        console.log(this.isAdmin)
        if (this.isAdmin) {
          this.$router.push({
            name: 'users'
          })
        } else {
          this.$router.push({
            name: 'profile',
            params: { username: this.$store.state.user.username }
          })
        }
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }

}
</script>

<style>

</style>
