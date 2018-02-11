import Vue from 'vue'
import Router from 'vue-router'
import contact from '@/components/contact'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'contact',
      component: contact
    }
  ]
})
