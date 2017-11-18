import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Post from '@/components/Post'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Home },
    { path: '/post/:id', component: Post }
  ]
})
