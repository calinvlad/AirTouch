import Api from '@/services/Api'

export default {
  users () {
    return Api().get('users')
  },
  listProjects () {
    return Api().get('projects')
  },
  createProject (data) {
    return Api().post('projects', data)
  },
  updateProject (project) {
    return Api().put(`projects/${project.id}`, project)
  },
  destroyProject (project) {
    return Api().delete(`projects/${project.id}`)
  },
  createApplication (id) {
    return Api().post(`/application/${id}`)
  }
}
