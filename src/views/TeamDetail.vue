<!--
 * @Author: your name
 * @Date: 2020-12-10 13:56:41
 * @LastEditTime: 2021-01-05 21:08:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \football\src\views\TeamDetail.vue
-->
<template>
  <div class="mx-auto w-50">
    <div class="btn-group w-100" role="group" aria-label="Basic example" :ref="'btns'">
      <button type="button" class="btn btn-secondary"
        :class=" 'team' === activeTabName ? 'active' : '' "
        @click="switchTab('team')">
        球队信息
      </button>
      <button type="button" class="btn btn-secondary"
        :class=" 'player' === activeTabName ? 'active' : '' "
        @click="switchTab('player')">
        球员信息
      </button>
    </div>
    <!-- 选项卡区域 -->
    <div id="mytab-content" class="tab-content">
      <!-- 球队信息选项卡 -->
      <div class="tab-pane"
        :class=" 'team' === activeTabName ? 'active' : '' ">
        <div class="text-center  ljx-bg p-5">
          <img class="w-25 rounded-circle" :src="teamMessage ? teamMessage.icon : ''" alt="">
        </div>
        <div class="px-5 text-white  ljx-bg pb-3" v-html="teamMessage ? teamMessage.introduce : ''">
        </div>
        <!-- 欧冠数据 -->
        <nav class="navbar navbar-light bg-danger text-white rounded-lg mt-3">
            <span class="navbar-brand mb-0 h1 text-white">欧冠</span>
        </nav>
        <div class="tab-pane text-dark" v-if="ouguanData">
          <table v-if="playerList" class="table table-dark rounded-lg w-100" >
            <thead>
                <tr>
                    <th scope="col" class="text-center">球队</th>
                    <th scope="col" class="text-center">进球</th>
                    <th scope="col" class="text-center">丢球</th>
                    <th scope="col" class="text-center">净胜球</th>
                    <th scope="col" class="text-center">胜</th>
                    <th scope="col" class="text-center">平</th>
                    <th scope="col" class="text-center">负</th>
                    <th scope="col" class="text-center">进程</th>
                </tr>
            </thead>
            <tbody>
                <tr :key="ouguanData.teamid">
                    <td class="text-center">{{ouguanData.clubName}}</td>
                    <td class="text-center">{{ouguanData.goal}}</td>
                    <td class="text-center">{{ouguanData.ballverlust}}</td>
                    <td class="text-center">{{ouguanData.goalDifference}}</td>
                    <td class="text-center">{{ouguanData.victory}}</td>
                    <td class="text-center">{{ouguanData.dogfall}}</td>
                    <td class="text-center">{{ouguanData.failure}}</td>
                    <td class="text-center">{{ouguanData.progress}}</td>
                </tr>
            </tbody>
          </table>
        </div>
        <!-- 赛程 -->
        <gloabl-calendar class="mt-3"/>
      </div>
      <!-- 球员信息选项卡 -->
      <div class="tab-pane text-dark"
        :class=" 'player' === activeTabName ? 'active' : '' ">
        <table v-if="playerList" class="table table-dark rounded-lg w-100" >
          <thead>
              <tr>
                  <th scope="col" class="text-center" style="width:8%">号码</th>
                  <th scope="col" class="text-center" style="width:20%">姓名</th>
                  <th scope="col" class="text-center" style="width:8%">进球</th>
                  <th scope="col" class="text-center" style="width:8%">助攻</th>
                  <th scope="col" class="text-center" style="width:8%">黄牌</th>
                  <th scope="col" class="text-center" style="width:8%">红牌</th>
                  <th scope="col" class="text-center" style="width:10%">参与进球</th>
                  <th scope="col" class="text-center" style="width:10%">出场次数</th>
                  <th scope="col" class="text-center" style="width:20%" v-if="login">操作</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="({ data, isEdit }, index) in playerList" :key="index">
                <!-- {{player.number}} -->
                  <td class="text-center">
                    <input type="text" v-model="data.number.value" pattern="[0-99]" :disabled="!isEdit.value" class="input-style">
                  </td>
                  <td class="text-center">
                    <input type="text" v-model="data.name.value" :disabled="!isEdit.value" class="input-style">
                  </td>
                  <td class="text-center">
                    <input type="text" v-model="data.goal.value" pattern="[0-99]" :disabled="!isEdit.value" class="input-style">
                  </td>
                  <td class="text-center">
                    <input type="text" v-model="data.assist.value" pattern="[0-99]" :disabled="!isEdit.value" class="input-style">
                  </td>
                  <td class="text-center">
                    <input type="text" v-model="data.yellowCard.value" pattern="[0-99]" :disabled="!isEdit.value" class="input-style">
                  </td>
                  <td class="text-center">
                    <input type="text" v-model="data.redCard.value" pattern="[0-99]" :disabled="!isEdit.value" class="input-style">
                  </td>
                  <td class="text-center">{{+data.goal.value + +(data.assist.value)}}</td>
                  <td class="text-center">
                    <input type="text" v-model="data.times.value" pattern="[0-99]" :disabled="!isEdit.value" class="input-style">
                  </td>
                  <td v-if="login" class="text-center">
                    <div v-if="isEdit.value" class="btn-group" role="group" aria-label="Basic example">
                      <button type="button" class="btn btn-secondary bg-success" @click="itemSubmitHandle(data.playerid, index)">
                        提交
                      </button>
                      <button type="button" class="btn btn-secondary" @click="itemCancleHandle(index)">取消</button>
                    </div>
                    <div v-else class="btn-group" role="group" aria-label="Basic example">
                      <button  type="button" class="btn btn-secondary bg-danger"  @click="itemEditHandle(data.playerid, index)">编辑</button>
                    </div>
                  </td>
              </tr>
          </tbody>
        </table>
        <!-- 批量操作 -->
        <div>
          <div v-if="activeTabName === 'player'" class="btn-group w-50 text-center" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-secondary bg-success" @click="largelySubmitHandle">
              提交
            </button>
            <button type="button" class="btn btn-secondary" @click="largelyCancleHandle">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref, Ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { GlobalStore, playerProp, ListProp } from '../GlobalTypes'
import GloablCalendar from '../components/GloablCalendar.vue'
export default defineComponent({
  name: 'TeamDetail',
  components: {
    GloablCalendar
  },
  setup () {
    const store = useStore<GlobalStore>()
    const route = useRoute()
    const teamId = route.params.teamId as string
    const leagueId = teamId.split('_')[0] as string
    // 获取登录状态
    const login = ref(store.state.user.isLogin)
    // 获取球队信息
    const teamMessage = computed(() => {
      console.log(store.state.teams.data[teamId])
      return store.state.teams.data[teamId]
    })
    // 获取欧冠数据
    const ouguanData = computed(() => {
      return store.state.teams.data[teamId] ? store.state.teams.data[teamId].ouguanData : ''
    })
    // 重组后的个体球员对象
    interface NewPlayProp {
      data: {
        playerid: number;
        name: Ref<string>;
        birthday: string;
        club: string;
        number: Ref<number>;
        country: string;
        goal: Ref<number>;
        assist: Ref<number>;
        yellowCard: Ref<number>;
        redCard: Ref<number>;
        times: Ref<number>;
        teamid: string;
        leagueid: string;
      };
      isEdit: Ref<boolean>;
    }
    // 获取球员列表
    const playerList = computed<NewPlayProp[]>(() => {
      // 获取球员列表对象
      const playListObj: ListProp<playerProp> = store.state.player[leagueId].data
      // 重组球员列表对象
      const playerListArr = Object.keys(playListObj).map(key => {
        return {
          data: {
            playerid: playListObj[key].playerid,
            name: ref(playListObj[key].name),
            birthday: playListObj[key].birthday,
            club: playListObj[key].club,
            number: ref(playListObj[key].number),
            country: playListObj[key].country,
            goal: ref(playListObj[key].goal),
            assist: ref(playListObj[key].assist),
            yellowCard: ref(playListObj[key].yellowCard),
            redCard: ref(playListObj[key].redCard),
            times: ref(playListObj[key].times),
            teamid: playListObj[key].teamid,
            leagueid: playListObj[key].leagueid
          },
          isEdit: ref(false)
        }
      })
      return playerListArr
    })
    // 当前激活选项卡
    const activeTabName = ref('team')
    // 切换选项卡
    const switchTab = (selector: string) => {
      switch (selector) {
        case 'team':
          activeTabName.value = 'team'
          break
        case 'player':
          activeTabName.value = 'player'
          store.dispatch('requestPlayerOfTeam', teamId)
          break
        default:
          break
      }
    }
    // 单项编辑行为
    const itemEditHandle = (playerId: number, index: number) => {
      playerList.value[index].isEdit.value = true
    }
    // 单项取消行为
    const itemCancleHandle = (index: number) => {
      playerList.value[index].isEdit.value = false
    }
    // 单项提交
    const itemSubmitHandle = (playerId: number, index: number) => {
      const list = playerList.value
      list[index].isEdit.value = false
      if (playerId === list[index].data.playerid) {
        const playerData: playerProp = {
          playerid: playerId,
          name: list[index].data.name.value,
          birthday: list[index].data.birthday,
          club: list[index].data.club,
          number: +list[index].data.number.value,
          country: list[index].data.country,
          goal: +list[index].data.goal.value,
          assist: +list[index].data.assist.value,
          yellowCard: +list[index].data.yellowCard.value,
          redCard: +list[index].data.redCard.value,
          times: +list[index].data.times.value,
          teamid: list[index].data.teamid,
          leagueid: list[index].data.leagueid
        }
        store.dispatch('requestUpdatePlayer', playerData)
      }
    }
    // 批量提交
    const largelySubmitHandle = () => {
      console.log('批量提交')
    }
    const largelyCancleHandle = () => {
      console.log('批量取消')
    }
    onMounted(() => {
      store.dispatch('requestTeam', teamId)
      store.dispatch('requestOuguanDataOfTeam', teamId)
    })
    return {
      login,
      switchTab,
      activeTabName,
      teamMessage,
      ouguanData,
      playerList,
      itemEditHandle,
      itemCancleHandle,
      itemSubmitHandle,
      largelySubmitHandle,
      largelyCancleHandle
    }
  }
})
</script>
<style lang="css" scoped>
  .input-style{
    width: 100%;
    background-color: transparent;
    color:white;
    text-align: center;
  }
  input:disabled {
    background-color: #343a40;
    border-color: #343a40;
    color: white;
    text-align: center;
    border: none;
  }
</style>
