<!--
 * @Author: your name
 * @Date: 2020-12-05 17:00:54
 * @LastEditTime: 2021-02-14 01:31:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \football\src\views\Login.vue
-->
<template>
  <div class="mx-auto p-3 col-11 col-md-4 text-white mt-5 ljx-bg">
    <h5 class="my-4 text-center">登录到FIFA</h5>
    <validate-form @form-submit="submitHandle">
      <div class="form-group mb-3">
        <label class="form-label">Email address</label>
        <validate-input type="text" placeholder="请输入邮箱地址"
          v-model="emailRef" :validate="validateEmailObj" />
      </div>
      <div class="form-group mb-3">
        <label class="form-label">password</label>
        <validate-input type="password" placeholder="请输入密码"
          v-model="passwordRef" :validate="validatePasswordObj" />
      </div>
      <template #submit>
        <button type="submit" class="btn btn-primary w-100">登录</button>
      </template>
    </validate-form>
    <div class="mt-3 text-center">
      <router-link to="/signup">未注册？跳转到注册页</router-link>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { GlobalStore, ValidateProp, MessageType } from '../GlobalTypes'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import ValidateInput from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import createMessage from '../components/createMessage'
export default defineComponent({
  name: 'Login',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const store = useStore<GlobalStore>()
    const router = useRouter()
    // 邮箱验证
    const emailRef = ref('')
    const validateEmailObj: ValidateProp = {
      tip: '请输入一个大于等于0的数字',
      rules: [
        { type: 'required', message: '请输入邮箱地址' },
        { type: 'email', message: '请输入一个正确的邮箱' }
      ]
    }
    // 密码验证
    const passwordRef = ref('')
    const validatePasswordObj: ValidateProp = {
      tip: '请输入一个大于等于0的数字',
      rules: [
        { type: 'required', message: '密码不能为空' },
        { type: 'length-range', minLength: 6, message: '请输入6位-18位密码' },
        { type: 'length-range', maxLength: 18, message: '请输入6位-18位密码' }
      ]
    }
    // 表单提交
    const submitHandle = (result: boolean) => {
      console.log('submitHandle')
      if (result) {
        const obj = { email: '', password: '' }
        obj.email = emailRef.value
        obj.password = passwordRef.value
        console.log(obj)
        store.dispatch('requestLogin', obj).then(() => {
          if (store.state.user.isLogin) {
            createMessage('登录成功2S后跳转到首页', 'success')
            setTimeout(() => router.push('/'), 2000)
            return
          }
          createMessage('登录失败', 'error')
        }).catch((e) => {
          console.log(e)
        })
      }
    }
    return { emailRef, validateEmailObj, passwordRef, validatePasswordObj, submitHandle }
  }
})
</script>
<style lang="css" scoped>
  .form-w{
    width: 330px;
  }
  .ljx-bg{
    background-color: rgba(15, 1, 1, 0.8);
  }
</style>
