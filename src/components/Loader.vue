<!--
 * @Author: your name
 * @Date: 2020-12-28 12:28:02
 * @LastEditTime: 2021-01-04 20:40:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \football\src\components\Loader.vue
-->
<template>
<teleport to="#back">
  <div
    class="d-flex justify-content-center align-items-center h-100 w-100 loading-container"
    :style="{backgroundColor: background || ''}"
  >
    <div class="loading-content">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">{{ text || ''}}</span>
      </div>
      <p v-if="text" class="text-primary small">{{text}}</p>
    </div>
  </div>
</teleport>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'

export default defineComponent({
  // 接收父组件传入的信息
  props: {
    // loader组件显示文字
    text: {
      type: String
    },
    // loader组件背景色
    background: {
      type: String
    }
  },
  setup () {
    // 创建一个节点
    const node = document.createElement('div')
    // 给node设置一个id
    node.id = 'back'
    // 在DOM中添加该节点
    document.body.appendChild(node)

    onUnmounted(() => {
      // 组件卸载时从页面上移除节点
      document.body.removeChild(node)
    })
  }
})
</script>

<style>
.loading-container {
  background: transparent;
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
}
.loading-container {
  text-align: center;
}
</style>
