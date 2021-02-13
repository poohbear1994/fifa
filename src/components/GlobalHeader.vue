<!--
 * @Author: your name
 * @Date: 2020-12-01 19:22:23
 * @LastEditTime: 2021-02-14 02:01:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \football\src\components\GlobalHearder.vue
-->
<template>
  <nav aria-label="breadcrumb" class="d-flex align-items-center position-sticky sticky-top bg-dark header-height" style="z-index:1031">
    <ul v-show="showHide" class="nav container-xl h-100 col-sm-10 col-3">
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
          <a class="nav-link text-white" href="#">世预赛</a>
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
    <ul v-if="!user.isLogin" class="d-flex justify-content-around align-self-center mb-0 col-sm-2 fold-btns">
      <router-link to="/login" class="ljx-btn btn btn-outline-light my-2">登陆</router-link>
      <router-link to="/signup" class="ljx-btn btn btn-outline-light my-2">注册</router-link>
    </ul>
    <ul v-else class="list-inline mb-0 col-sm-3 fold-btns">
      <router-link to="/person" class="ljx-btn btn btn-outline-light my-2">个人页</router-link>
      <span @click="handleLogout" class="ljx-btn btn btn-outline-light my-2">退出登录</span>
    </ul>
    <div @click.stop="showCategory" class="d-mobile col-3 ljx-btn btn my-2" style="color:#fff">分类菜单</div>
    <h1 class="d-none col-6">FIFA</h1>
    <div class="d-mobile col-3">
      <router-link to="/login" class="ljx-btn btn my-2" style="color:#fff">登陆</router-link>
    </div>
  </nav>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { GlobalStore } from '../GlobalTypes'
export default defineComponent({
  name: 'GlobalHeader',
  setup () {
    const router = useRouter()
    const store = useStore<GlobalStore>()
    const user = store.state.user
    const showHide = ref(true)
    // 退出登录
    const handleLogout = () => {
      store.commit('logout')
      router.push('/')
    }
    const showCategory = () => {
      console.log(showHide.value)
      showHide.value ? showHide.value = false : showHide.value = true
      console.log(showHide.value)
    }
    onMounted(() => {
      // 判断当前屏幕大小
      if (window.screen.width < 576) showHide.value = false
      // 隐藏侧边栏
      document.addEventListener('click', () => {
        if (window.screen.width < 576) showHide.value = false
      })
      console.log(user)
    })
    return { handleLogout, showCategory, showHide, user }
  }
})
</script>
<style lang="css" scoped>
.position-right{
  right: 15px
}
.line-height-100{
  line-height: 100%;
}
.ljx-btn{
  height: 2.5rem;
}
.d-mobile{
  display: none;
}
@media screen and (max-width:576px) {
  .nav{
    flex-direction: column;
    display: flex;
    flex-wrap: nowrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
    position: fixed;
    padding-right: 0;
    left: 0;
    top: 0;
    background: linear-gradient(180deg,rgb(255, 0, 0) 25%,
    rgb(0, 255, 42) 50%,
    rgb(0, 174, 255) 75%,
    rgb(255, 0, 234) 100%);
    overflow: auto;
    border-radius: 5px;
    z-index: 999;
  }
  .nav-item{
    overflow: hidden;
    border-top: 1px solid rgba(0, 0, 0, .5);
  }
  .nav-link{
    text-align: center;
    line-height: 100%;
    height: 100%;
    padding: .5rem .1rem
  }
  .navbar-brand{
    display: none;
  }
  .nav-link.disabled {
    color: #6c757d;
    pointer-events: none;
    cursor: default;
    display: none;
  }
  .fold-btns{
    display: none !important;
  }
  h1{
    display: block !important;
    width: 100%;
    color: #fff;
    text-align: center;
  }
  .d-mobile{
    display: block;
  }
}
</style>
