<!--
 * @Author: your name
 * @Date: 2020-12-04 18:46:16
 * @LastEditTime: 2020-12-06 11:40:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \football\src\components\ValidateInput.vue
-->
<template>
  <input
    class="form-control"
    :class="{'is-invalid': isError}"
    v-model="inputVal"
    v-on:input="updateVal"
    :="$attrs"
  >
  <span class="invalid-feedback position-absolute mt-1">{{error}}</span>
</template>
<script lang="ts">
import { defineComponent, ref, PropType, onMounted, inject } from 'vue'
import { ValidateProp, RuleProp } from '../GlobalTypes'
import { emitter } from './ValidateForm.vue'
export default defineComponent({
  name: 'ValidateInput',
  props: {
    modelValue: {
      type: String
    },
    validate: Object as PropType<ValidateProp>
  },
  inheritAttrs: false,
  setup (props, context) {
    const inputVal = ref('')
    const error = ref('')
    const isError = ref(false)
    const tip = props.validate ? props.validate.tip : ''
    // 验证email的正则表达式
    const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    /**
     * @description: 获取input的值，并传递给父组件
     * @param {*}
     * @return {*}
     */
    const updateVal = () => {
      const { value } = inputVal
      context.emit('update:modelValue', value)
      if (props.validate) {
        const { validate } = props
        const { rules } = validate
        const allparsed: boolean = rules.every((rule: RuleProp) => {
          let parse = true
          error.value = rule.message || ''
          switch (rule.type) {
            case 'required':
              parse = !!value.trim()
              break
            case 'email':
              parse = emailReg.test(value)
              break
            case 'custom':
              parse = rule.validator ? rule.validator() : true
              break
            case 'length-range':
              if (rule.minLength && value.trim().length < rule.minLength) {
                parse = false
              }
              if (rule.maxLength && value.trim().length > rule.maxLength) {
                parse = false
              }
              break
            case 'value-range':
              if (rule.minValue && (+value) < rule.minValue) {
                parse = false
              }
              if (rule.maxValue && (+value) > rule.maxValue) {
                parse = false
              }
              break
            default:
              break
          }
          return parse
        })
        isError.value = !allparsed
        return allparsed
      }
    }
    onMounted(() => {
      // 当该自定义组件载入完成时，响应form-item-created通知，传递验证方法给广播站
      emitter.emit('form-item-created', {
        validator: updateVal,
        formName: inject('formName')
      })
    })
    return { inputVal, updateVal, tip, error, isError }
  }
})
</script>
