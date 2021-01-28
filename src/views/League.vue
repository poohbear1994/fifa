<!--
 * @Author: your name
 * @Date: 2020-12-01 17:26:38
 * @LastEditTime: 2021-01-06 14:25:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \football\src\views\ChampionsLeague.vue
-->
<template>
  <universalLeague :score="score" :tops="top" :newsList="newsList" :key="leagueId"/>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { GlobalStore } from '../GlobalTypes'
import UniversalLeague from '../components/UniversalLeague.vue'
import { objToArr } from '../LJXTsTools'
export default defineComponent({
  name: 'ChampionsLeague',
  components: {
    UniversalLeague
  },
  setup () {
    const store = useStore<GlobalStore>()
    const route = useRoute()
    // 获取联赛ID
    const leagueId = computed(() => {
      return route.params.id
    })
    // 随时获取最新联赛积分
    const score = computed(() => {
      const league = leagueId.value as string
      return store.state.score[league].data
    })
    const top = computed(() => {
      const league = leagueId.value as string
      return objToArr(store.state.tops[league].data).reverse()
    })
    const newsList = computed(() => {
      const league = leagueId.value as string
      return objToArr(store.state.news[league].data).reverse()
    })
    watch(leagueId, () => {
      console.log('watch')
      const league = leagueId.value as string
      if (route.params.id) {
        store.dispatch('requestLeagueScore', route.params.id)
        store.dispatch('requestLeagueTops', route.params.id)
        if (store.state.news[league].currentPage === 0) {
          store.dispatch('requestLeagueNews', { leagueId: leagueId.value, page: store.state.news[league].currentPage + 1 })
        } else {
          store.dispatch('requestLeagueNews', { leagueId: leagueId.value, page: store.state.news[league].currentPage })
        }
      }
    })
    onMounted(() => {
      console.log('onMounted')
      const league = leagueId.value as string
      store.dispatch('requestLeagueScore', leagueId.value)
      store.dispatch('requestLeagueTops', leagueId.value)
      if (store.state.news[league].currentPage === 0) {
        store.dispatch('requestLeagueNews', { leagueId: leagueId.value, page: store.state.news[league].currentPage + 1 })
      } else {
        store.dispatch('requestLeagueNews', { leagueId: leagueId.value, page: store.state.news[league].currentPage })
      }
    })
    return { score, top, newsList, leagueId }
  }
})
</script>
