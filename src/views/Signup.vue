<!--
 * @Author: your name
 * @Date: 2020-12-06 13:11:36
 * @LastEditTime: 2020-12-27 16:14:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \football\src\views\signup.vue
-->
<template>
  <div class="mx-auto p-3 w-25 text-white ljx-bg mt-5">
    <h5 class="my-4 text-center">注册你的FIFA账号</h5>
    <validate-form @form-submit="submitHandle">
      <div class="form-group mb-3">
        <label class="form-label">Email address</label>
        <validate-input type="text" placeholder="请输入邮箱地址"
          v-model="emailRef" :validate="validateEmailObj" />
      </div>
      <div class="form-group mb-3">
        <label class="form-label">nickname</label>
        <validate-input type="text" placeholder="请输入昵称"
          v-model="nicknameRef" :validate="validateNicknameObj" />
      </div>
      <div class="form-group mb-3">
        <label class="form-label">password</label>
        <validate-input type="password" placeholder="请输入密码"
          v-model="passwordRef" :validate="validatePasswordObj" />
      </div>
      <div class="form-group mb-3">
        <label class="form-label">repeat password</label>
        <validate-input type="password" placeholder="请再次输入密码"
          v-model="repeatPasswordRef" :validate="validateRepeatPasswordObj" />
      </div>
      <template #submit>
        <button type="submit" class="btn btn-primary w-100">注册</button>
      </template>
    </validate-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import ValidateInput from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import { ValidateProp } from './../GlobalTypes'
export default defineComponent({
  name: 'Signup',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const router = useRouter()
    // 邮箱验证
    const emailRef = ref('')
    const validateEmailObj: ValidateProp = {
      rules: [
        { type: 'required', message: '请输入邮箱地址' },
        { type: 'email', message: '请输入一个正确的邮箱' }
      ]
    }
    // 昵称验证
    const nicknameRef = ref('')
    const validateNicknameObj: ValidateProp = {
      rules: [
        { type: 'required', message: '昵称不能为空' },
        { type: 'length-range', minLength: 1, message: '请输入1-7位昵称' },
        { type: 'length-range', maxLength: 7, message: '请输入1-7位昵称' }
      ]
    }
    // 密码验证
    const passwordRef = ref('')
    const validatePasswordObj: ValidateProp = {
      rules: [
        { type: 'required', message: '密码不能为空' },
        { type: 'length-range', minLength: 6, message: '请输入6位-18位密码' },
        { type: 'length-range', maxLength: 18, message: '请输入6位-18位密码' }
      ]
    }
    // 重复密码验证
    const repeatPasswordRef = ref('')
    const validateRepeatPasswordObj: ValidateProp = {
      rules: [
        { type: 'required', message: '重复密码不能为空' },
        { type: 'length-range', minLength: 6, message: '请输入6位-18位密码' },
        { type: 'length-range', maxLength: 18, message: '请输入6位-18位密码' },
        {
          type: 'custom',
          validator: () => {
            return repeatPasswordRef.value === passwordRef.value
          },
          message: '两次输入的密码不一致'
        }
      ]
    }
    // 表单提交
    const submitHandle = (result: boolean) => {
      console.log('submitHandle')
      if (result) {
        const postData = { email: '', password: '', nickname: '' }
        postData.email = emailRef.value
        postData.password = passwordRef.value
        postData.nickname = nicknameRef.value
        console.log(postData)
        axios.post('/api/signup', postData).then(() => {
          confirm('注册成功')
          // 2秒后跳转到login页面
          setTimeout(() => {
            router.push('/login')
          }, 2000)
        }).catch(e => console.log(e))
      } else {
        console.log('验证不通过')
      }
    }
    return {
      emailRef,
      validateEmailObj,
      passwordRef,
      validatePasswordObj,
      nicknameRef,
      validateNicknameObj,
      repeatPasswordRef,
      validateRepeatPasswordObj,
      submitHandle
    }
  }
})
</script>
<style lang="css" scoped>
  .ljx-bg{
    background-color: rgba(15, 1, 1, 0.8);
  }
  .form-w{
    width: 330px;
  }
</style>
