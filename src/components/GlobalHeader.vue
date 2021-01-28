<!--
 * @Author: your name
 * @Date: 2020-12-01 19:22:23
 * @LastEditTime: 2021-01-02 13:46:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \football\src\components\GlobalHearder.vue
-->
<template>
  <nav aria-label="breadcrumb" class="container-fluid position-sticky sticky-top bg-dark header-height" style="z-index:1031">
    <ul class="nav container-xl justify-content-center h-100">
      <li class="nav-item">
          <router-link class="navbar-brand nav-link text-success" to="/">FIFA</router-link>
      </li>
      <li class="nav-item">
          <router-link class="nav-link text-white" to="/">欧冠</router-link>
      </li>
      <li class="nav-item">
          <a class="nav-link text-info disabled" href="#" tabindex="-1" aria-disabled="true">五大联赛</a>
      </li>
      <li class="nav-item">
          <router-link class="nav-link text-white active" to="/league/yingchao">英超</router-link>
      </li>
      <li class="nav-item">
          <router-link class="nav-link text-white" to="/league/xijia">西甲</router-link>
      </li>
      <li class="nav-item">
          <router-link class="nav-link text-white" to="/league/dejia">德甲</router-link>
      </li>
      <li class="nav-item">
          <router-link class="nav-link text-white" to="/league/yijia">意甲</router-link>
      </li>
      <li class="nav-item">
          <router-link class="nav-link text-white" to="/league/fajia">法甲</router-link>
      </li>
      <li class="nav-item">
          <a class="nav-link text-info disabled" href="#" tabindex="-1" aria-disabled="true">国际赛事</a>
      </li>
      <li class="nav-item">
          <a class="nav-link text-white active" href="#">世界杯</a>
      </li>
      <li class="nav-item">
          <a class="nav-link text-white" href="#">欧洲杯</a>
      </li>
      <li class="nav-item">
          <a class="nav-link text-white" href="#">世界杯预选赛</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white" href="#">欧预赛</a>
      </li>
      <!-- 搜索 -->
      <li class="nav-item">
        <router-link class="nav-link text-danger" to="/search">
          搜索页
        </router-link>
      </li>
    </ul>
    <ul v-if="!user.isLogin" class="list-inline mb-0 position-absolute sticky-top position-right">
      <li class="list-inline-item"><router-link to="/login" class="btn btn-outline-light my-2">登陆</router-link></li>
      <li class="list-inline-item"><router-link to="/signup" class="btn btn-outline-light my-2">注册</router-link></li>
    </ul>
    <ul v-else class="list-inline mb-0 position-absolute sticky-top position-right">
      <li class="list-inline-item"><router-link to="/person" class="btn btn-outline-light my-2">个人页</router-link></li>
      <li class="list-inline-item" @click="handleLogout"><span class="btn btn-outline-light my-2">退出登录</span></li>
    </ul>
  </nav>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { GlobalStore } from '../GlobalTypes'
export default defineComponent({
  name: 'GlobalHeader',
  setup () {
    const router = useRouter()
    const store = useStore<GlobalStore>()
    const user = store.state.user
    // 退出登录
    const handleLogout = () => {
      store.commit('logout')
      router.push('/')
    }
    onMounted(() => {
      console.log(user)
    })
    return { handleLogout, user }
  }
})
</script>
<style lang="css" scoped>
.position-right{
  right: 80px
}
.header-height{
    height: 54px;
}
.line-height-100{
    line-height: 100%;
}
</style>
