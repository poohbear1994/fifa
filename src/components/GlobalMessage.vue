<!--
 * @Author: your name
 * @Date: 2020-12-08 11:54:36
 * @LastEditTime: 2020-12-27 17:00:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \football\src\components\GlobalMessage.vue
-->
<template>
  <teleport to="#message">
    <div class="mx-auto alert text-center w-25 fixed-top message-top d-flex justify-content-between"
      :class="classObject" role="alert">
      <span>{{message}}</span>
    </div>
  </teleport>
</template>
<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { MessageType } from '../GlobalTypes'
export default defineComponent({
  name: 'GlobalMessage',
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String as PropType<MessageType>,
      required: true
    }
  },
  setup (props) {
    const classObject = {
      'alert-success': props.type === 'success',
      'alert-danger': props.type === 'error',
      'alert-primary': props.type === 'warning'
    }
    return { classObject }
  }
})
</script>
<style lang="css" scoped>
  .message-top {
    top: 60px
  }
</style>
