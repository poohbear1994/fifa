<!--
 * @Author: your name
 * @Date: 2021-01-02 13:34:10
 * @LastEditTime: 2021-01-02 14:15:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \football\src\views\Search.vue
-->
<template>
  <div class="w-75 min-height mx-auto ljx-bg d-flex">
    <div class=" w-75 mx-auto justify-content-center mt-5">
      <div class="input-group mb-1">
        <input type="text" class="form-control" placeholder="拜仁" aria-label="Recipient's username" aria-describedby="basic-addon2">
        <div class="input-group-append">
          <span class="input-group-text" id="basic-addon2">搜索</span>
        </div>
      </div>
      <div v-if="false" class="drop-down-wrap bg-white rounded"></div>
    </div>
  </div>
</template>
<style scoped>
  .min-height{
    min-height: 700px;
  }
  .drop-down-wrap{
    max-height: 500px;
  }
  span.input-group-text:hover{
    cursor: pointer;
  }
</style>
