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
          v-model="email"
          label="E-mail"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          required
        ></v-text-field>
        <v-text-field
          v-model="first_name"
          label="First Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="last_name"
          label="Last Name"
          required
        ></v-text-field>
        <div class="danger-alert" v-html="error"></div>
        <v-btn @click="register">submit</v-btn>
      </form>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthService from '@/services/AuthService'
export default {
  data () {
    return {
      username: '',
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthService.register({
          username: this.username,
          email: this.email,
          password: this.password,
          first_name: this.first_name,
          last_name: this.last_name
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'login'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style>
.error {
  color: red
}
</style>
