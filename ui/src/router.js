import Vue from 'vue'
import Router from 'vue-router'
import Register from './components/User/Register'
import Login from './components/User/Login'
import Profile from './components/User/Profile'
import Projects from './components/User/Projects'

// import Admin from './views/Admin'
import Users from './components/Admin/Users'
import AdminProjects from './components/Admin/Projects'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/register', name: 'register', component: Register },
    { path: '/login', name: 'login', component: Login },
    { path: '/profile/:username', name: 'profile', component: Profile },
    { path: '/projects', name: 'projects', component: Projects },
    { path: '/admin/users', name: 'users', component: Users },
    { path: '/admin/projects', name: 'adminprojects', component: AdminProjects }
  ]
})
