import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import JobsReasultsView from '@/views/JobsReasultsView.vue'
import JobView from '@/views/JobView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/jobs/reasults',
    name: 'JobsReasults',
    component: JobsReasultsView
  },
  {
    path: '/jobs/reasults/:id',
    name: 'JobListing',
    component: JobView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router
