<!--
 * @Author: your name
 * @Date: 2020-12-01 19:22:23
 * @LastEditTime: 2020-12-05 18:36:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \football\src\components\GlobalHearder.vue
-->
<template>
    <footer aria-label="breadcrumb" class="text-center py-4 text-secondary bg-light mt-auto">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 慕课网（imooc.com）版权所有 | 津ICP备20000929号-1</li>
          <li class="list-inline-item"><a href="https://coding.imooc.com/class/449.html" target="_blank">购买课程</a></li>
          <li class="list-inline-item"><a href="http://docs.vikingship.xyz/" target="_blank">文档</a></li>
          <li class="list-inline-item"><a href="http://api.vikingship.xyz/" target="_blank">API 在线调试</a></li>
          <li class="list-inline-item"><a href="http://showcase.vikingship.xyz/" target="_blank">组件库演示</a></li>
        </ul>
      </small>
    </footer>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'GlobalHeader'
})
</script>
<style lang="stylus" scoped>

</style>
