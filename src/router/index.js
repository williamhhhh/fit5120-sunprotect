import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomePage.vue'
import Reminder from '@/views/ReminderPage.vue'
import UVimpact from '@/views/UVimpactPage.vue'
import ClothingRecommendation from '@/views/ClothingRecommendation.vue'
import PersonalisationPage from '@/views/PersonalisationPage.vue'

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
    path: '/clothing',
    name:'Clothing',
    component: ClothingRecommendation,
  },
  {
    path: '/personalisation',
    name:'Personalisation',
    component: PersonalisationPage,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
