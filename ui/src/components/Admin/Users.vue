<template>
  <v-layout>
    <v-flex xs6 offset-xs3 class="mt-5">
      <v-data-table
      :headers="headers"
      :items="users"
      class="elevation-1"
      >
      <template v-slot:items="props">
        <td>{{ props.item.username }}</td>
        <td class="text-xs-left">{{ props.item.email }}</td>
        <td class="text-xs-left">{{ props.item.first_name }}</td>
        <td class="text-xs-left">{{ props.item.last_name }}</td>
      </template>
    </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import AdminService from '@/services/AdminService'
export default {
  data () {
    return {
      users: [],
      headers: [
        { text: 'Username', align: 'left', value: 'username' },
        { text: 'Email', value: 'email', sortable: false },
        { text: 'First Name', value: 'last_name', sortable: false },
        { text: 'Last Name', value: 'last_name', sortable: false }
      ]
    }
  },
  computed: {
    ...mapState([
      'isAdmin'
    ])
  },
  async mounted () {
    this.users = (await AdminService.users()).data
  }
}
</script>

<style>

</style>
