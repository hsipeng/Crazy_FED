import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/index'
import Post from '../components/post'
import Login from '../components/login'
import Home from '../components/home'
import Signout from '../components/signout'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/topic/:id',
      name: 'Post',
      component: Post
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/signout',
      name: 'Signout',
      component: Signout
    }
  ]
})
