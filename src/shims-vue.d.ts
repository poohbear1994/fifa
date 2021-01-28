/*
 * @Author: your name
 * @Date: 2020-12-01 17:26:38
 * @LastEditTime: 2020-12-09 16:50:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \football\src\shims-vue.d.ts
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module 'swiper/vue'
