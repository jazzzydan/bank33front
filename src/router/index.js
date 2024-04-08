import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ErrorView from "@/views/ErrorView.vue";
import AtmsView from "@/views/AtmsView.vue";
import LocationView from "@/views/LocationView.vue";
import NotAuthorizedView from "@/views/NotAuthorizedView.vue";

const routes = [
  {
    path: '/',
    name: 'homeRoute',
    component: HomeView
  },
  {
    path: '/error',
    name: 'errorRoute',
    component: ErrorView
  },
  {
    path: '/atms',
    name: 'atmsRoute',
    component: AtmsView
  },
  {
    path: '/not-authorized',
    name: 'notAuthorizedRoute',
    component: NotAuthorizedView
  },
  {
    path: '/location/:locationId?',
    name: 'locationRoute',
    component: LocationView,
    // URL + Path variable
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
