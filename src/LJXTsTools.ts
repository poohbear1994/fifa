/*
 * @Author: your name
 * @Date: 2020-12-24 22:32:27
 * @LastEditTime: 2020-12-24 22:35:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \football\src\LJXTsTools.ts
 */
export const arrToObj = <T extends { _id?: string }>(arr: Array<T>) => {
  return arr.reduce((prev, current) => {
    if (current._id) {
      prev[current._id] = current
    }
    return prev
  }, {} as { [key: string]: T })
}
  
/**
 * @description: 对象转数组
 * @param {*} V
 * @return {*}
 */
export const objToArr = <V>(obj: {[key: string]: V}) => {
  return Object.keys(obj).map(key => obj[key])
}