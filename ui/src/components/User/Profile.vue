<template>
  <v-layout>
    <v-flex xs6 offset-xs3 class="mt-5">
      <v-card>
        <v-layout>
          <v-flex xs6>
            <v-avatar
            :size="200"
            color="grey lighten-4"
            class="my-5"
          >
            <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar">
          </v-avatar>
          </v-flex>
          <v-flex xs6>
            <v-layout align-center justify-center class="my-5">
              <div>
                <h1>{{this.user.username}}'s info:</h1>
                <p class="mt-4">Email: {{this.user.email}}</p>
                <p>First Name: {{this.user.first_name}}</p>
                <p>Last Name: {{this.user.last_name}}</p>
              </div>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState([
      'user'
    ])
  }
}
</script>

<style lang="sass" scoped>

</style>
