/*
 * @Author: your name
 * @Date: 2020-12-01 17:26:38
 * @LastEditTime: 2021-01-02 13:35:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \football\src\router\index.ts
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ChampionsLeague from '../views/ChampionsLeague.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'ChampionsLeague',
    component: ChampionsLeague
  },
  {
    path: '/league/:id',
    name: 'League',
    component: () => import(/* webpackChunkName: "about" */ '../views/League.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "about" */ '../views/Signup.vue')
  },
  {
    path: '/person',
    name: 'Person',
    component: () => import(/* webpackChunkName: "about" */ '../views/Person.vue')
  },
  {
    path: '/teamDetail/:teamId',
    name: 'TeamDetail',
    component: () => import(/* webpackChunkName: "about" */ '../views/TeamDetail.vue')
  },
  {
    path: '/post/:postId',
    name: 'Post',
    component: () => import(/* webpackChunkName: "about" */ '../views/Post.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
