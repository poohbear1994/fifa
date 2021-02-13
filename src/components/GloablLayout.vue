<!--
 * @Author: your name
 * @Date: 2020-12-02 12:28:05
 * @LastEditTime: 2021-02-14 01:42:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \football\src\components\GloablLayout.vue
-->
<template>
    <div class="container px-0">
        <div class="row">
            <div class="col-sm-4 col-12">
                <slot name="sidebar"></slot>
            </div>
            <div class="col-sm-8 col-12">
                <slot name="default"></slot>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'GloablLayout'
})
</script>
