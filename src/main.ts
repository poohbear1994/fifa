/*
 * @Author: your name
 * @Date: 2020-12-01 17:26:38
 * @LastEditTime: 2020-12-28 12:48:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \football\src\main.ts
 */
import { createApp } from 'vue'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8001'

axios.interceptors.request.use((config) => {
  // 开启loading
  store.commit('setLoading', true)
  return config
})

axios.interceptors.response.use((config) => {
  // 关闭loading
  store.commit('setLoading', false)
  return config
})
createApp(App).use(store).use(router).mount('#app')