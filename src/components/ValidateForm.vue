<!--
 * @Author: your name
 * @Date: 2020-11-21 10:30:27
 * @LastEditTime: 2020-12-07 00:01:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zheye\src\components\ValidateForm.vue
-->
<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area mt-5" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary w-100">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, provide } from 'vue'
// 引入任务广播器
import mitt from 'mitt'

// 定义一个函数类型，要求返回值必须是一个bool值
type ValidateFunc = () => boolean
// 回调函数interface
interface CallbackProps {
  validator: ValidateFunc;
  formName: string;
}
// 创建一个广播电台
export const emitter = mitt()

export default defineComponent({
  // 父组件中传入的事件
  emits: ['form-submit'],
  props: {
    // 请提供不同的 formName 当使用多个表单在同一个页面中的时候
    name: {
      type: String,
      default: 'default'
    }
  },
  setup (props, context) {
    provide('formName', props.name)
    // 定义一个数组，该数组元素要求符合ValidateFunc特征
    let funcArr: ValidateFunc[] = []

    /**
     * @description: 提交表单
     * @param {*}
     * @return {*}
     */
    const submitForm = () => {
      // 遍历执行funcArr内的验证函数，然后要求map返回的数组的每一项都必须是bool值
      // 这里我们没有指定every里的result参数的类型，因为result参数的类型已经在map里用
      // ValidateFunc这个type指定为了boolean
      const result = funcArr.map(func => func()).every(result => result)
      console.log('result' + result)
      // 触发父组件传递过来的表单提交事件，传入结果，进行提交
      context.emit('form-submit', result)
    }

    /**
     * @description: 通知派发出去的传单（任务），填写信息（传值）使，该组件可以获得信息
     * @param {*} obj 填写的信息
     * @return {*}
     */
    const callback = (obj?: CallbackProps) => {
      if (obj && obj.formName === props.name) {
        funcArr.push(obj.validator)
      }
    }

    // 监听form-item-created任务
    emitter.on('form-item-created', callback)

    onUnmounted(() => {
      // 组件卸载的时候，移除通知
      emitter.off('form-item-created', callback)
      // 重置验证函数数组
      funcArr = []
    })
    return {
      submitForm
    }
  }
})
</script>
