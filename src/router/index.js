import Vue from 'vue'
import VueRouter from 'vue-router'
import Permission from '../components/Permission.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Permission',
    component: Permission
  },
  {
    path: '/permissiontypes',
    name: 'PermissionType',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/PermissionType.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
