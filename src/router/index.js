import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:slug?',
      name: 'main',
      component: MainView
    },
    {
      path: '/not-found',
      name: 'NotFound',
      component: NotFoundView,
    },
  ]
})

export default router
