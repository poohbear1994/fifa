<!--
 * @Author: your name
 * @Date: 2020-12-21 13:26:07
 * @LastEditTime: 2021-01-04 21:50:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fifa\football\src\views\Post.vue
-->
<template>
  <article class="w-50 mx-auto p-5" v-html="post?post.post:''"></article>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { GlobalStore } from '../GlobalTypes'
export default defineComponent({
  name: 'post',
  setup () {
    const store = useStore<GlobalStore>()
    const route = useRoute()
    // 获取文章ID
    const postId = route.params.postId as string
    console.log(postId)
    const post = computed(() => {
      return store.state.post.data[postId]
    })
    onMounted(() => {
      store.dispatch('requestNewsDetail', postId)
    })
    return { post }
  }
})
</script>
<style>
  article{
    background-color: rgba(14, 6, 6, 0.8);
    color: #fff;
  }
  p{
    text-indent: 2rem;
  }
  .f_center{
    text-align: center;
  }
</style>
