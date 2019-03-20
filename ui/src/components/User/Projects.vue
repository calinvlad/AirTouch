<template>
  <div>
    <v-layout wrap>
      <v-flex xs6 offset-xs3>
        <v-card v-for="project in projects" :key="project.id" class="my-5 px-5 py-5">
          <h1 class="mb-3">{{ project.name }}</h1>
          <p>{{ project.description }}</p>
          <v-btn
          v-if="isUserLoggedIn && !isAdmin"
          @click="submit()" dark class="blue">Request interview</v-btn>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AdminService from '@/services/AdminService'
export default {
  data: () => ({
    projects: {},
    applicated: true,
    project: {
      name: '',
      description: ''
    }
  }),
  computed: {
    ...mapState([
      'user',
      'isUserLoggedIn',
      'isAdmin'
    ])
  },
  created () {
    this.initialize()
  },
  methods: {
    async submit (id) {
      alert(`I hope this was a fine approach.`)
      this.initialize()
    },
    async initialize () {
      this.projects = (await AdminService.listProjects()).data
    }
  }
}
</script>

<style>

</style>
