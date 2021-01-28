/*
 * @Author: your name
 * @Date: 2020-12-08 14:40:21
 * @LastEditTime: 2020-12-27 16:58:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \football\src\components\createMessage.ts
 */
import { createApp } from 'vue'
import GlobalMessage from './GlobalMessage.vue'
import { MessageType } from '../GlobalTypes'
import { createDOM } from '@/createDOM'

const createMessage = (message: string, type:MessageType, timeout:number = 2000) => {
  const messageInstance = createApp(GlobalMessage, {
    message,
    type
  })
  const mountNode = createDOM('message')
  messageInstance.mount(mountNode)
  setTimeout(() => {
    messageInstance.unmount(mountNode)
    document.body.removeChild(mountNode)
  }, timeout)
}

export default createMessage