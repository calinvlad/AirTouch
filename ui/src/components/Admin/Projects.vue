<template>
  <v-layout>
    <v-flex xs8 offset-xs2>
      <div class="mt-5">
        <v-toolbar flat color="white">
          <v-toolbar-title>Projects</v-toolbar-title>
          <v-divider
            class="mx-2"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="700px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">New Project</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container grid-list-md>
                  <v-layout column>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.name" label="Project name"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-textarea
                      v-model="editedItem.description"
                      label="Project description"
                      value="editedItem.description"
                    ></v-textarea>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" flat @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <v-data-table
          :headers="headers"
          :items="projects"
          class="elevation-1"
        >
          <template v-slot:items="props">
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.description }}</td>
            <td class="justify-center layout px-0">
              <v-icon
                small
                class="mr-2"
                @click="editItem(props.item)"
              >
                edit
              </v-icon>
              <v-icon
                small
                @click="deleteItem(props.item)"
              >
                delete
              </v-icon>
            </td>
            
          </template>
          <template v-slot:no-data> 
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AdminService from '@/services/AdminService'
export default {
  data: () => ({
    dialog: false,
    headers: [
      { text: 'Name', align: 'left', value: 'name' },
      { text: 'Description', align: 'left', value: 'description', sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      name: '',
      description: ''
    },
    defaultItem: {
      name: '',
      description: ''
    },
    projects: [],
    project: ''
  }),
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    async initialize () {
      this.projects = (await AdminService.listProjects()).data
    },
    editItem (item) {
      this.editedIndex = this.projects.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    async deleteItem (item) {
      const index = this.projects.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.projects.splice(index, 1)
      this.project = await AdminService.destroyProject(item)
      this.initialize()
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    async save () {
      if (this.editedIndex > -1) {
        Object.assign(this.projects[this.editedIndex], this.editedItem)
        this.updateProject = (await AdminService.updateProject(this.editedItem)).data
        this.initialize()
      } else {
        this.projects.push(this.editedItem)
        this.project = (await AdminService.createProject({
          name: this.editedItem.name,
          description: this.editedItem.description
        })).data
        this.initialize()
      }
      this.close()
    }
  }
}
</script>

<style>
</style>
