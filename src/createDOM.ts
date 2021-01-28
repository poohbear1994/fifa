/*
 * @Author: your name
 * @Date: 2020-12-08 12:29:17
 * @LastEditTime: 2020-12-27 16:31:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \football\src\createDOM.ts
 */
import { onUnmounted } from 'vue'
export const createDOM:(id:string) => HTMLDivElement = (id:string) => {
    const newNode = document.createElement('div')
    newNode.id = id
    document.body.appendChild(newNode)
    onUnmounted(() => {
        document.body.removeChild(newNode)
    })
    return newNode
}