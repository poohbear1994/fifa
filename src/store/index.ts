/*
 * @Author: your name
 * @Date: 2020-12-01 17:26:38
 * @LastEditTime: 2021-01-05 22:17:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \football\src\store\index.ts
 */
import { createStore, Commit} from 'vuex'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { GlobalStore, GameProp } from '../GlobalTypes'

/**
 * @description: 发送异步请求与操作mutation
 * @param {*} async
 * @return {*}
 */
const asyncAndCommit = async (url: string, mumtationName: string, commit:Commit, config: AxiosRequestConfig = { method: 'get' }, extraData?: any ) => {
  const response: AxiosResponse = await axios(url, config, )
  // 如果有额外数据
  if (extraData) {
    commit(mumtationName, {response, extraData})
  } else {
    commit( mumtationName, response )
  }
  return response
}

/**
 * @description: 元素对象里有postid属性的数组转为对象
 * @param {*}
 * @return {*}
 */
const postIdArrToObj =<T extends { postid: string }>(arr: Array<T>) => {
  const obj = {}
  for (let i = 0; i < arr.length; i++) {
      obj[arr[i].postid] = arr[i]
  }
  return obj
}

/**
 * @description: 元素对象里有teamid属性的数组转为对象
 * @param {*}
 * @return {*}
 */
const teamIdArrToObj =<T extends { teamid: string }>(arr: Array<T>) => {
  const obj = {}
  for (let i = 0; i < arr.length; i++) {
      obj[arr[i].teamid] = arr[i]
  }
  return obj
}

/**
 * @description: 元素对象里有playerid属性的数组转为对象
 * @param {*}
 * @return {*}
 */
const playerIdArrToObj =<T extends { playerid: string }>(arr: Array<T>) => {
  const obj = {}
  for (let i = 0; i < arr.length; i++) {
      obj[arr[i].playerid] = arr[i]
  }
  return obj
}

/**
 * @description: 元素对象里有gameDate属性的数组转为对象
 * @param {*}
 * @return {*}
 */
const gameDateArrToObj =<T extends { date: string }>(arr: Array<T>) => {
  const obj = {}
  for (let i = 0; i < arr.length; i++) {
      obj[arr[i].date] = arr[i]
  }
  return obj
}

// 获取联赛id
const getleagueId = (response:any) => {
  return response.config.url.split('?')[1].split('=')[1]
}

// store
export default createStore<GlobalStore>({
  state: {
    teams:{
      data:{}
    },
    score:{
      dejia:{ data:{}, isLoaded:false },
      xijia:{ data:{}, isLoaded:false },
      yingchao:{ data:{}, isLoaded:false },
      fajia:{ data:{}, isLoaded:false },
      yijia:{ data:{}, isLoaded:false }
    },
    news:{
      dejia:{ data:{}, currentPage:0 },
      xijia:{ data:{}, currentPage:0 },
      yingchao:{ data:{}, currentPage:0 },
      fajia:{ data:{}, currentPage:0 },
      yijia:{ data:{}, currentPage:0 }
    },
    tops:{
      dejia:{ data:{}, isLoaded:false },
      xijia:{ data:{}, isLoaded:false },
      yingchao:{ data:{}, isLoaded:false },
      fajia:{ data:{}, isLoaded:false },
      yijia:{ data:{}, isLoaded:false }
    },
    post:{ data:{}},
    player:{ 
      dejia:{ data:{}, loaded:[] },
      xijia:{ data:{}, loaded:[] },
      yingchao:{ data:{}, loaded:[] },
      fajia:{ data:{}, loaded:[] },
      yijia:{ data:{}, loaded:[] }
    },
    games:{},
    user:{
      isLogin:false
    }
  },
  mutations: {
    
    /**
     * @description: 接收联赛积分
     * @param {*} state
     * @param {*} response
     * @return {*}
     */
    fetchLeagueScore(state,response) {
      // 获取联赛id
      const leagueId = getleagueId(response)
      state.score[leagueId].data = response.data.data
      console.log(state.score[leagueId].data)
      state.score[leagueId].isLoaded = true
    },

    /**
     * @description: 接收联赛头条
     * @param {*} state
     * @param {*} response
     * @return {*}
     */
    fetchLeagueTops(state,response) {
      const topsObj = postIdArrToObj(response.data.data)
      // 获取联赛id
      const leagueId = getleagueId(response)
      state.tops[leagueId].data = {...state.tops[leagueId].data, ...topsObj}
      state.tops[leagueId].isLoaded = true
    },

    /**
     * @description: 接收联赛新闻
     * @param {*} state
     * @param {*} response
     * @return {*}
     */
    fetchLeagueNews(state,response) {
      const newsObj = postIdArrToObj(response.data.data)
      // 获取联赛id
      const leagueId = response.config.url.split('?')[1].split('&')[0].split('=')[1]
      console.log(leagueId)
      state.news[leagueId].data = {...state.news[leagueId].data, ...newsObj}
      if (response.data.data.length > 0) {
        state.news[leagueId].currentPage ++
      }
    },

    /**
     * @description: 接收文章
     * @param {*} state
     * @param {*} response
     * @return {*}
     */
    fetchPost(state,response) {
      const postObj = postIdArrToObj(response.data.data)
      state.post.data = {...state.post.data, ...postObj}
    },

    /**
     * @description: 接收球队信息
     * @param {*} state
     * @param {*} response
     * @return {*}
     */
    fetchTeam(state,response) {
      const teamObj = teamIdArrToObj(response.data.data)
      state.teams.data = {...state.teams.data, ...teamObj}
    },

    /**
     * @description: 接收球队球员
     * @param {*} state
     * @param {*} response
     * @return {*}
     */
    fetchPlayerOfTeam(state,response) {
      const teamId: string = response.config.url.split('?')[1].split('=')[1]
      const leagueId: string = teamId.split('_')[0]
      const playerObj = playerIdArrToObj(response.data.data)
      state.player[leagueId].data = {...state.player[leagueId].data, ...playerObj}
      state.player[leagueId].loaded.push(teamId)
      console.log(state.player[leagueId])
    },

    /**
     * @description: 接收球队欧冠数据
     * @param {*}
     * @return {*}
     */
    fetchOuguanDataOfTeam(state, response) {
      const teamId = response.config.url.split('?')[1].split('=')[1]
      const ouguanData = response.data.data[0]
      state.teams.data[teamId] = {...state.teams.data[teamId], ouguanData: ouguanData}
      // console.log(state.teams.data[teamId])
    },

    /**
     * @description: 接收球队赛程
     * @param {*} state
     * @param {*} response
     * @return {*}
     */
    fetchTeamSchdule(state, {response, extraData}) {
      const data = response.data.data
      // 获取查询的年月
      const queryYear = extraData.queryDate.split('-')[0]
      const queryMonth = +extraData.queryDate.split('-')[1]+''
      console.log(queryMonth)
      // 获取teamId
      const teamId = extraData.teamId
      // 初始化数据列表
      state.games[queryYear] = { ...state.games[queryYear] }
      state.games[queryYear][queryMonth] = { ...state.games[queryYear][queryMonth] }
      state.games[queryYear][queryMonth][teamId] = { ...state.games[queryYear][queryMonth][teamId] }
      // 遍历数据，修改数据的date格式
      data.forEach((item: GameProp) => {
        // 转为国内时间
        const localtime = new Date(item.date)
        // 获取返回数据年
        const year = localtime.getFullYear()
        // 获取月
        const month = localtime.getMonth() + 1
        // 获取日
        const day = localtime.getDate()
        item.date = `${year}-${month}-${day}`
      })
      // 赛程数据打平为对象
      const scheduleData =  gameDateArrToObj(data)
      // 数据添加到state中
      state.games[queryYear][queryMonth][teamId] = { ...state.games[queryYear][queryMonth][teamId], ...scheduleData}
      console.log(state.games)
    },

    /**
     * @description: 更新球员数据
     * @param {*}
     * @return {*}
     */
    updatePlayer(state, response) {
      const playerData = response.data.data[0]
      const league = playerData.leagueid
      const playerId = playerData.playerid
      state.player[league][playerId] = playerData
    },    

    /**
     * @description: 退出登录
     * @param {*} state
     * @return {*}
     */
    logout(state) {
      state.user.isLogin = false
    },

    /**
     * @description: 登录
     * @param {*} state
     * @param {*} rawData
     * @return {*}
     */
    login(state, response){
      console.log(response)
      if (response.data.data.nickname) {
        state.user.isLogin = true
      }
    },

    /**
     * @description: 设置loading状态
     * @param {*}
     * @return {*}
     */
    setLoading(state,status){
      state.loading = status
    }
  },
  actions: {
    /**
     * @description: 请求登录
     * @param {*}
     * @return {*}
     */    
    requestLogin({ commit, state }, postData) {
      if (!state.user.isLogin) {
        return asyncAndCommit(`/api/login`, 'login', commit, { method: 'post', data: postData})
      }
    },

    /**
     * @description: 请求联赛积分
     * @param {string} leagueId 联赛id
     * @return {*}
     */
    requestLeagueScore({ commit, state }, leagueId) {
      if (!state.score[leagueId].isLoaded) {
        return asyncAndCommit(`/api/league/score?leagueId=${leagueId}`, 'fetchLeagueScore', commit)
      }
    },

    /**
     * @description: 获取联赛头条
     * @param {*} context
     * @param {*} leagueId
     * @return {*}
     */
    requestLeagueTops({ commit, state }, leagueId) {
      if (!state.tops[leagueId].isLoaded) {
        return asyncAndCommit(`/api/league/toplist?leagueId=${leagueId}`, 'fetchLeagueTops', commit)
      }
    },

    /**
     * @description: 请求联赛新闻
     * @param {string} leagueId 联赛id
     * @param {string} page 请求页数
     * @return {*}
     */
    requestLeagueNews({ commit, state }, {leagueId, page}) {
      console.log(leagueId)
      if (page > state.news[leagueId].currentPage) {
        return asyncAndCommit(`/api/league/newList?leagueId=${leagueId}&page=${page}`, 'fetchLeagueNews', commit)
      }
    },

    /**
     * @description: 请求新闻详情
     * @param {*} context
     * @param {*} postId 文章id
     * @return {*}
     */
    requestNewsDetail({ commit, state }, postId) {
      if (!state.post.data[postId]) {
        return asyncAndCommit(`/api/post?postId=${postId}`, 'fetchPost', commit)
      }
    },

    /**
     * @description: 请求球队信息
     * @param {*} context
     * @param {*} teamId
     * @return {*}
     */
    requestTeam({ commit, state}, teamId) {
      if (!state.teams.data[teamId]) {
        return asyncAndCommit(`/api/team?teamId=${teamId}`, 'fetchTeam', commit)
      }
    },

    /**
     * @description: 请求俱乐部队员信息
     * @param {*}
     * @return {*}
     */
    requestPlayerOfTeam({ commit, state }, teamId) {
      const leagueId: string = teamId.split('_')[0]
      const loadedArr: number[] = state.player[leagueId].loaded
      if (loadedArr.indexOf(teamId) < 0) {
        return asyncAndCommit(`/api/allPlayerOfTeam?teamId=${teamId}`, 'fetchPlayerOfTeam', commit)
      }
    },

    /**
     * @description: 请求球队欧冠信息
     * @param {*}
     * @return {*}
     */
    requestOuguanDataOfTeam({ commit, state }, teamId) {
      const teamData = state.teams.data[teamId]
      if (!teamData) {
        return asyncAndCommit(`/api/teamDataOfOuguan?teamId=${teamId}`, 'fetchOuguanDataOfTeam', commit)
      }
    },

    /**
     * @description: 获取球队赛程
     * @param {*} param1
     * @param {*} param2
     * @return {*}
     */
    requestTeamSchdule( { commit, state }, {teamId, queryDate}) {
      const m = +queryDate.split('-')[1]
      const y = +queryDate.split('-')[0]
      console.log(m,y)
      if (state.games[y]) {
        if (state.games[y][m]) {
          if (state.games[y][m][teamId]) {
            return
          }
        }
      }
      return asyncAndCommit(`/api/teamSchedule?teamId=${teamId}&queryDate=${queryDate}`,
      'fetchTeamSchdule',
      commit,
      { method: 'get' },
      {
        teamId,
        queryDate
      })
    },
    
    /**
     * @description: 请求升级球员数据
     * @param {*}
     * @return {*}
     */
    requestUpdatePlayer({ commit, state}, postData) {
      return asyncAndCommit(`/api/updatePlayer`, 'updatePlayer', commit, { method: 'post', data: postData})
    }
  },
  getters: {
  }
})
