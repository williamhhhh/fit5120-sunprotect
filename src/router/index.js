import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomePage.vue'
import Reminder from '@/views/ReminderPage.vue'
import UVimpact from '@/views/UVimpactPage.vue'
import UVindex from '@/views/UVindexPage.vue'
import ClothingRecommendation from '@/views/ClothingRecommendation.vue'

const routes = [
  {
    path: '/',
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
  },
  {
    path: '/index',
    name:'UVindex',
    component: UVindex,
  },
  {
    path: '/clothing',
    name:'Clothing',
    component: ClothingRecommendation,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
