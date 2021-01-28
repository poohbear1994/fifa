/*
 * @Author: your name
 * @Date: 2020-12-11 14:35:34
 * @LastEditTime: 2021-01-08 14:05:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \football\src\LJXCalendar.ts
 */

/**
 * @description: 返回平年每月天数构成的数组
 * @param {*}
 * @return {*}
 */
export const getPingYearDays = () => {
  return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
}

/**
 * @description: 返回闰年每月天数构成的数组
 * @param {*}
 * @return {*}
 */
export const getRunYearDays = () => {
  return [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
}

type yearType = 'runYear' | 'pingYear'
/**
 * @description: 判断传入年是平年还是闰年
 * @param {*} yearType 返回值为闰年或平年字符串
 * @return {*}
 */
export const judgePingYearOrRunYear: (yearNum:number) => yearType = (yearNum: number) => {
  if (yearNum % 4 !== 0) {
    console.log('平年')
    return 'pingYear'
  } else {
    console.log('闰年')
    return 'runYear'
  }
}

/**
 * @description: 获取上一月有多少天
 * @param {number} month 月份（0为1月）
 * @param {number} howDaysOfYear （每月天数组成的数组）
 * @return {*}
 */
const getDaysOfLastMonth = (month: number, howDaysOfYear: number[] ) => {
  if (month - 1 < 0) {
    return howDaysOfYear[11]
  } else {
    return howDaysOfYear[month - 1]
  }
}

import { ComputedRef } from 'vue'
/**
 * @description: 日历生成器，生成本月日历
 * @param {Date} date 传入日期对象，必须为1号
 * @return {*}
 */
export const useSetCurrentMonthCalendar = (date: Date) => {
    // 年
    const year = date.getFullYear()
    // 月
    const month = date.getMonth()
    // 日
    const day = date.getDate()
    // 星期几
    const week = date.getDay()
    // 判断当前年是闰年还是平年
    let whatYear: yearType = judgePingYearOrRunYear(year)
    // 获取一年由多少天组成 每个月的天数[]
    let howDaysOfYear = null
    // 设定当前年日子组成
    howDaysOfYear = whatYear === 'runYear' ? getRunYearDays() : getPingYearDays()
    // 获取当前月有多少天
    const daysOfCurrentMonth = howDaysOfYear[month]
    // 获取上一月有多少天
    const daysOfLastMonth = getDaysOfLastMonth(month, howDaysOfYear)
    // 获取循环次数(日历格子数)
    const getCount = () => {
      if (week + daysOfCurrentMonth > 35) {
        return 42
      } else {
        return 35
      }
    }
    // 获取提前量
    const preset = week
    // 获取上一月从几号开始
    let prevDaysOfMonth: number = daysOfLastMonth - preset
    // 设定当前日历
    const calendar = []
    for (let i = 1, j = 1, count = getCount(); i <= count; i++) {
      const obj = {
        day:0,
        date:''
        // game: {
        //   gameid: 0,
        //   zhuduiid: '',
        //   zhuduiname: '',
        //   keduiid: '',
        //   keduiname: '',
        //   date: ''
        // }
      }
      // 上月月尾
      if (i <= preset) {
        let m = 0
        if (month===0) {
          m=12
        }else{
          m = month
        }
        prevDaysOfMonth++
        obj.date=`${year}-${m}-${prevDaysOfMonth}` 
        obj.day=prevDaysOfMonth
        calendar.push(obj)
      // 下月月初
      } else if (i > howDaysOfYear[month] + preset) {
        let m = 0
        if (month+2 > 12) {
          m=1
        } else {
          m=month + 2
        }
        obj.day=j
        obj.date=`${year}-${m}-${j}`
        calendar.push(obj)
        j++
      // 本月
      } else {
        obj.date=`${year}-${month+1}-${i - preset}`
        obj.day= i - preset
        calendar.push(obj)
      }
    }
    return calendar
  }