import { createRouter, createWebHistory } from 'vue-router'
import CountriesView from '../views/CountriesView.vue'

import { ROUTES } from '@/utils/consts.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CountriesView,
    },
    {
      path: ROUTES.map.path,
      name: ROUTES.map.name,
      component: () => import('../views/CountriesView.vue'),
    },
    {
      path: ROUTES.wine.path,
      name: ROUTES.wine.name,
      component: () => import('../views/CountriesView.vue'),
    },
    {
      path: ROUTES.travel.path,
      name: ROUTES.travel.name,
      component: () => import('../views/CountriesView.vue'),
    },
    {
      path: ROUTES.countries.path,
      name: ROUTES.countries.name,
      component: () => import('../views/CountriesView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
