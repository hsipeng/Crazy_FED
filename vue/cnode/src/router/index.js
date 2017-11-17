import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/index'
import Post from '../components/post'
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
    }
  ]
})
