<!--
 * @Author: your name
 * @Date: 2020-12-10 23:06:00
 * @LastEditTime: 2021-01-06 14:19:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \football\src\components\GloablCalendar.vue
-->
<template>
    <div class="w-100">
      <div class="btn-group text-center w-100" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-secondary" @click="prevMonth">上一页</button>
        <button type="button" class="btn btn-secondary disable">{{`${year}年${month + 1}月`}}</button>
        <button type="button" class="btn btn-secondary" @click="nextMonth">下一页</button>
      </div>
      <div class="d-flex">
        <div class="headItem">星期天</div>
        <div class="headItem">星期一</div>
        <div class="headItem">星期二</div>
        <div class="headItem">星期三</div>
        <div class="headItem">星期四</div>
        <div class="headItem">星期五</div>
        <div class="headItem">星期六</div>
      </div>
      <div class="d-flex flex-wrap">
        <div class="day"
          :key="index"
          v-for="(item,index) of data.howDaysOfMonth">
          <div>
            {{item.day}}
          </div>
          <div v-if="scheduleData">
            <div v-if="scheduleData[year]">
              <div v-if="scheduleData[year][month+1]">
                <div v-if="scheduleData[year][month+1][teamId][`${year}-${month+1}-${item.day}`]">
                  <div v-if="item.date===scheduleData[year][month+1][teamId][`${year}-${month+1}-${item.day}`].date">
                    {{scheduleData[year][month+1][teamId][`${year}-${month+1}-${item.day}`].zhuduiname +' VS ' + scheduleData[year][month+1][teamId][`${year}-${month+1}-${item.day}`].keduiname}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref, Ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalStore } from '../GlobalTypes'
import { useSetCurrentMonthCalendar } from '../LJXCalendar'
/**
 * @description: 获取赛程
 * @param {*} date
 * @return {*}
 */
export function setQueryDate (date: Date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  let dateStr = ''
  if (month < 10) {
    dateStr = `${year}-0${month}`
  } else {
    dateStr = `${year}-${month}`
  }
  return dateStr
}

export default defineComponent({
  name: 'GloablCalendar',
  setup () {
    const route = useRoute()
    const store = useStore<GlobalStore>()
    const teamId = route.params.teamId as string
    const date = new Date()
    const month = ref(date.getMonth())
    const year = ref(date.getFullYear())
    // 获取赛程数据
    const scheduleData = computed(() => {
      return store.state.games
    })
    // 设置赛程请求日期
    const data = reactive({
      howDaysOfMonth: [{
        day: 1,
        date: ''
      }]
    })
    // 设置为1号
    const oneDate = new Date(year.value, month.value, 1)
    data.howDaysOfMonth = useSetCurrentMonthCalendar(oneDate)
    // 获取新日期
    const getNewDate = (month: Ref<number>) => {
      if (month.value >= 11) {
        year.value++
        month.value = 0
        return new Date(year.value, month.value, 1)
      } else if (month.value < 0) {
        year.value--
        month.value = 11
        return new Date(year.value, month.value, 1)
      } else {
        return new Date(year.value, month.value, 1)
      }
    }
    // 设置请求日期
    const m = date.getMonth()
    const y = date.getFullYear()
    const queryDate = setQueryDate(new Date(y, m))
    store.dispatch('requestTeamSchdule', { teamId: teamId, queryDate: queryDate })

    // 上一月
    const prevMonth = () => {
      month.value--
      const newDate = getNewDate(month)
      const queryDate = setQueryDate(newDate)
      store.dispatch('requestTeamSchdule', { teamId: teamId, queryDate: queryDate })
      data.howDaysOfMonth = useSetCurrentMonthCalendar(newDate)
    }
    // 下一月
    const nextMonth = () => {
      month.value++
      const newDate = getNewDate(month)
      const queryDate = setQueryDate(newDate)
      store.dispatch('requestTeamSchdule', { teamId: teamId, queryDate: queryDate })
      data.howDaysOfMonth = useSetCurrentMonthCalendar(newDate)
    }
    return { data, prevMonth, nextMonth, month, year, teamId, scheduleData }
  }
})
</script>
<style lang="css" scoped>
  .headItem{
     width: 14.29%;
     background-color: rgba(255, 9, 9, 0.5);
     border: 1px solid gray;
     color: white;
  }
  .day{
    /* flex: 1 1 auto; */
    width: 14.28%;
    height: 100px;
    background-color: rgba(14, 6, 6, 0.8);
    color: #fff;
    border: 1px solid gray;
  }
  .noDay{
    width: 14.28%;
    height: 100px;
    background-color: transparent;
    border: 1px solid transparent;
  }
</style>
