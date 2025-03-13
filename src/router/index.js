import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomePage.vue'
import Reminder from '@/views/ReminderPage.vue'
import UVimpact from '@/views/UVimpactPage.vue'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/reminder',
    name: 'Reminder',
    component: Reminder,
  },
  {
    path: '/impact',
    name: 'UVimpact',
    component: UVimpact,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
