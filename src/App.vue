<!--
 * @Author: your name
 * @Date: 2020-12-01 17:26:38
 * @LastEditTime: 2020-12-29 20:11:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \football\src\App.vue
-->
<template>
  <div class="bg-secondary global-background-img flex-shrink-0">
    <global-header></global-header>
    <loader v-if="isLoading"></loader>
    <router-view class="mb-5"/>
  </div>
  <global-footer />
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { GlobalStore } from './GlobalTypes'
import GlobalHeader from './components/GlobalHeader.vue'
import GlobalFooter from './components/GlobalFooter.vue'
import Loader from './components/Loader.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import './LJXGlobalStyle.css'
export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    Loader,
    GlobalFooter
  },
  setup () {
    const store = useStore<GlobalStore>()
    const currentUser = store.state.user
    const isLoading = computed(() => store.state.loading)
    return { currentUser, isLoading }
  }
})
</script>
<style>

</style>
