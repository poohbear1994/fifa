<!--
 * @Author: your name
 * @Date: 2020-12-01 19:32:57
 * @LastEditTime: 2020-12-27 13:11:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \football\src\views\League.vue
-->
<template>
  <div class="w-75 mx-auto">
    欢迎来到{{route.params.id}}页面
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'ChampionsLeague',
  components: {
  },
  setup () {
    const route = useRoute()
    return {
      route
    }
  }
})
</script>
<style lang="css" scoped>
  div{
    color: #fff;
  }
</style>
