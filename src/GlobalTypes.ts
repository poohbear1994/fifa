/*
 * @Author: your name
 * @Date: 2020-12-02 16:09:11
 * @LastEditTime: 2021-01-04 17:32:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \football\src\GlobalTypes.ts
 */

// store
export interface GlobalStore {
  teams: teamsProp<GlobalTeam>
  score: scoreProp,
  user: userProp,
  token?: string,
  error?: GlobalErrorProps,
  loading?: boolean,
  tops: topsProp,
  news: GlobalFiveLeagueProp<GlobalNewProp>,
  post: GlobalPostsProp<postProp>,
  player: GlobalplayerProp<playerProp>,
  games: ListProp<
    ListProp<{
      teams: ListProp<GameProp>,
      loadeadTemid:string[]
    }>
  >
}

// 全局球员信息
interface GlobalplayerProp<T> {
  dejia : { data:ListProp<T>, loaded:string[] },
  xijia : { data:ListProp<T>, loaded:string[] },
  yijia : { data:ListProp<T>, loaded:string[] },
  yingchao : { data:ListProp<T>, loaded:string[] },
  fajia : { data:ListProp<T>, loaded:string[] }
}

// 球员属性
export interface playerProp {
  playerid:number,
  name:string,
  birthday:string,
  club:string,
  number:number,
  country:string,
  goal:number,
  assist:number,
  yellowCard:number,
  redCard:number,
  times:number,
  teamid:string,
  leagueid:string
}

// teamsProp
export interface teamsProp<T>{
  data: ListProp<T>
}

// 联赛积分prop
export interface scoreProp {
  dejia:{ data: GlobalScore | {}, isLoaded: boolean },
  xijia:{ data: GlobalScore | {}, isLoaded: boolean },
  yingchao:{ data: GlobalScore | {}, isLoaded: boolean },
  yijia:{ data: GlobalScore | {}, isLoaded: boolean },
  fajia:{ data: GlobalScore | {}, isLoaded: boolean },
}

// 联赛头条
export interface topsProp {
  dejia:{ data: GlobalNewProp | {}, isLoaded: boolean },
  xijia:{ data: GlobalNewProp | {}, isLoaded: boolean },
  yingchao:{ data: GlobalNewProp | {}, isLoaded: boolean },
  yijia:{ data: GlobalNewProp | {}, isLoaded: boolean },
  fajia:{ data: GlobalNewProp | {}, isLoaded: boolean },
}

// error
export interface GlobalErrorProps {
  isError: boolean,
  message: string
}
// userProp
export interface userProp {
  isLogin:boolean
}

// 队伍
export interface GlobalTeam {
  teamid: string,
  league: string,
  name: string,
  icon: string,
  introduce: string,
  ouguanData: gameData
}

interface gameData {
  teamid: string,
  clubName: string,
  goal: number,
  ballverlust: number,
  goalDifference: number,
  victory: number,
  dogfall: number,
  failure: number,
  progress: string
}

// 队伍联赛积分
export interface teamScore {
  leagueid: string,
  teamid: string,
  name: string,
  victory: number,
  dogfall: number,
  failure: number,
  score: number
}

// 联赛积分
export interface GlobalScore {
  title: string,
  header: string[],
  teams: teamScore[]
}

// 新闻
export interface GlobalNewProp {
  title: string,
  date: string,
  summary: string,
  team: string,
  postid: number,
  leagueid: string,
  top:number,
  topimg:string
}

// 五大联赛新闻列表
export interface GlobalFiveLeagueProp<T> {
  dejia : { data:ListProp<T>, currentPage:number },
  xijia : { data:ListProp<T>, currentPage:number },
  yijia : { data:ListProp<T>, currentPage:number },
  yingchao : { data:ListProp<T>, currentPage:number },
  fajia : { data:ListProp<T>, currentPage:number }
}

// 全局文章
export interface GlobalPostsProp<T>{
  data:ListProp<T>
}

// 文章数据
interface postProp{
  postid:string,
  post:string
}

// 新闻列表
export interface GlobalNewsListProp {
  data: ListProp<GlobalNewProp>
}

// 列表
export interface ListProp<T>{
  [key:string]:T
}

// 输入框验证子规则
export interface RuleProp {
  type: 'required' | 'email' | 'custom' | 'length-range' | 'value-range',
  message?: string,
  validator?: () => boolean,
  minLength?: number,
  maxLength?: number,
  minValue?: number,
  maxValue?: number
}

// 输入框验证规则对象
export interface ValidateProp {
  tip?: string,
  rules: RuleProp[]
}

// messageType
export type MessageType = 'success' | 'error' | 'warning'

// 赛事对象
export interface GameProp{
  gameid: number;
  zhuduiid: string;
  zhuduiname: string;
  keduiid: string;
  keduiname: string;
  date: string;
};