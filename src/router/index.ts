import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import JobsReasultsView from '@/views/JobsReasultsView.vue'
import JobView from '@/views/JobView.vue'
import TeamsView from '@/views/TeamsView.vue'

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
  },
  {
    path: '/teams',
    name: 'Teams',
    component: TeamsView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
  scrollBehavior() {
    return { top: 0, left: 0, behavior: 'smooth' }
  }
})

export default router
