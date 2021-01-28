<!--
 * @Author: your name
 * @Date: 2020-12-02 12:28:05
 * @LastEditTime: 2020-12-02 15:24:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \football\src\components\GloablLayout.vue
-->
<template>
    <div class="container">
        <div class="row">
            <div class="col-4">
                <slot name="sidebar"></slot>
            </div>
            <div class="col-8">
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
