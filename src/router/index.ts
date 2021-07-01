import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import ClientHome from '../views/ClientHome.vue'
import RestaurantHome from '../views/RestaurantHome.vue'
import DeliveryHome from '../views/DeliveryHome.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: Login
  }, 
  {
    path: '/home',
    name: 'Home',
    component: Home
  }, 
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/clients',
    name: 'ClientHome',
    component: ClientHome
  },
  {
    path: '/restaurants',
    name: 'RestaurantHome',
    component: RestaurantHome
  },
  {
    path: '/deliveries',
    name: 'DeliveryHome',
    component: DeliveryHome
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router