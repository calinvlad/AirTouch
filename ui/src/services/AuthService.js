import Api from '@/services/Api'

export default {
  login (credentials) {
    return Api().post('login', credentials)
  },
  register (credentials) {
    return Api().post('register', credentials)
  }
}
