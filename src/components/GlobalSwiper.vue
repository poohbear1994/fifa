<!--
 * @Author: your name
 * @Date: 2020-12-08 15:28:39
 * @LastEditTime: 2020-12-27 12:15:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \football\src\components\GlobalSwiper.vue
-->
<template>
  <div v-if="tops"
    id="carouselExampleCaptions"
    class="carousel slide overflow-hidden swiper-height"
    data-ride="carousel">
    <!-- 指示器区域 -->
    <ol class="carousel-indicators">
      <li v-for="(item, index) in tops"
        :key="item.postid"
        :class="index===activeId?'active':''"
        data-target="#carouselExampleCaptions"
        :data-slide-to="index" @click="clickHandle(index)">
      </li>
    </ol>
    <!-- 内容区域 -->
    <router-link v-for="(item, index) in tops"
      :to="`/post/${item.postid}`"
      :key="item.postid"
      v-show="index === activeId">
      <div class="carousel-inner h-100" :data-item="index">
        <div class="carousel-item h-100 active">
          <img :src="item.topimg" class="d-block w-100 h-100" alt="1">
          <div class="carousel-caption d-none d-md-block ">
            <h5>{{item.title}}</h5>
            <div>{{item.summary}}</div>
          </div>
        </div>
      </div>
    </router-link>
    <!-- 左右按钮区域 -->
    <a id="prevButton" class="carousel-control-prev" href="#" role="button"
      @click="prevBtnHandle" key="prevButton">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a id="nextButton" class="carousel-control-next" href="#" role="button"
      @click="nextBtnHandle" key="nextButton">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import { GlobalNewProp } from './../GlobalTypes'
export default defineComponent({
  name: 'GlobalSwiper',
  components: {
  },
  props: {
    tops: {
      type: Array as PropType<GlobalNewProp[]>
    }
  },
  setup (props) {
    const topLength = computed(() => {
      return props.tops ? props.tops.length : 0
    })
    const activeId = ref(0)
    const prevBtnHandle = () => {
      (activeId.value - 1 < 0) ? activeId.value = topLength.value - 1 : activeId.value -= 1
    }
    const nextBtnHandle = () => {
      (activeId.value + 1 >= topLength.value) ? activeId.value = 0 : activeId.value += 1
    }
    const clickHandle = (id: number) => {
      activeId.value = id
    }
    return { activeId, prevBtnHandle, nextBtnHandle, clickHandle }
  }
})
</script>
<style scoped>
  .swiper-height {
    min-height: 400px;
    background-color: rgba(14, 6, 6, 0.8);
  }
</style>
