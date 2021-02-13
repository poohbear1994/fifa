<!--
 * @Author: your name
 * @Date: 2020-12-02 12:22:59
 * @LastEditTime: 2021-02-14 01:55:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \football\src\components\Universal.vue
-->
<template>
  <div class="bg-transparent container-xl px-0 overflow-hidden">
    <div style="height: 1px"></div>
    <gloabl-layout class="mt-3">
        <template #sidebar>
            <globa-raking class="raking-height" :table="score" style="height:300px" />
        </template>
        <template #default>
            <global-swiper :tops="tops" class="mb-3" style="height:400px"></global-swiper>
            <new-list :newsList="newsList"></new-list>
            <div class="w-100 bg-white text-center load-more rounded" @click="loadMoreHandle">点击加载更多</div>
            <globa-raking :table="score" class="raking-height-500 mt-3" />
        </template>
    </gloabl-layout>
    <div style="height: 1px"></div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { GlobalStore, GlobalScore, GlobalNewProp } from './../GlobalTypes'
import { computed, defineComponent, PropType } from 'vue'
import GlobaRaking from '../components/GlobaRaking.vue'
import NewList from '../components/NewList.vue'
import GloablLayout from '../components/GloablLayout.vue'
import GlobalSwiper from '../components/GlobalSwiper.vue'
export default defineComponent({
  name: 'UniversalLeague',
  components: {
    GlobaRaking,
    NewList,
    GloablLayout,
    GlobalSwiper
  },
  props: {
    score: {
      type: Object as PropType<GlobalScore>
    },
    tops: {
      type: Object as PropType<GlobalNewProp>
    },
    newsList: {
      type: Object as PropType<GlobalNewProp>
    }
  },
  setup () {
    const route = useRoute()
    const leagueId = route.params.id as string
    const store = useStore<GlobalStore>()
    const loadMorePage = computed(() => {
      return store.state.news[leagueId].currentPage + 1
    })
    const loadMoreHandle = () => {
      store.dispatch('requestLeagueNews', { leagueId: leagueId, page: loadMorePage.value })
      console.log(`加载第${loadMorePage.value}页`)
    }
    return { loadMoreHandle }
  }
})
</script>
<style lang="css" scoped>
  .raking-height-500{
    height: 500px;
    background-color: rgba(14, 6, 6, 0.8);
  }
  .raking-height {
    min-height: 250px;
    background-color: rgba(14, 6, 6, 0.8);
  }
  .load-more{
    height: 50px;
    line-height: 50px;
  }
  .load-more:hover{
    cursor: pointer;
    background-color: rgba(223, 226, 211, 0.8)!important
  }
  @media screen and (max-width:576px) {
    .nav-bar{
      padding: auto 0;
    }
  }
</style>
