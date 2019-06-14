import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import test from '../components/test.vue'
import index from '../components/pages/index.vue'
import details from '../components/pages/details.vue'
import comment from '../components/pages/comment.vue'
import collect from '../components/pages/collect.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      component: index
    },
    {
      path:'/collect',
      component:collect
    },
    {
      path: '/details/:id',
      component: details
    },
    {
      path:'/comment/:id',
      component:comment
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})
