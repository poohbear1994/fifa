<!--
 * @Author: your name
 * @Date: 2020-12-01 21:00:48
 * @LastEditTime: 2021-01-02 16:09:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \football\src\components\NewList.vue
-->
<template>
  <div class="overflow-auto rounded-lg">
    <div class="position-sticky fixed-top">
      <nav class="navbar navbar-light bg-danger text-white rounded-lg">
        <span class="navbar-brand mb-0 h1 text-white">新闻列表</span>
      </nav>
    </div>
    <div class="list-group list-height ">
      <router-link
        v-for="post in newsList"
        :key="post.postid"
        :to="`/post/${post.postid}`"
        class="list-group-item list-group-item-action">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{post.title}}</h5>
          <small>{{post.date.split('T')[0]}}</small>
        </div>
        <div class="mb-1 text-left">{{post.summary}}</div>
        <small>{{post.team}}</small>
      </router-link>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { GlobalNewProp } from './../GlobalTypes'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'NewList',
  props: {
    newsList: {
      type: Array as PropType<GlobalNewProp[]>,
      required: true
    }
  },
  components: {

  },
  setup () {
    const router = useRoute()
    const leagueId = router.params.id
    return { leagueId }
  }
})
</script>
<style scoped>
  .list-height{
    min-height: 500px;
    background-color: rgba(14, 6, 6, 0.8);
  }
</style>
