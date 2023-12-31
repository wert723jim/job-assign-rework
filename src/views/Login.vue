<template>
  <UserLayout>
    <div class="flex justify-center mt-[40px]">
      <form @submit.prevent="handleSubmit">
        <div :class="fieldGroupClass">
          <label
            for="username"
            class="text-primary"
          >帳號</label>
          <input
            type="text"
            id="username"
            placeholder="請輸入帳號"
            :class="inputClass"
            v-model="formData.username"
            @input="error.username = ''"
          >
          <span
            v-show="error.username"
            :class="errorClass"
          >{{ error.username }}</span>
        </div>
        <div :class="fieldGroupClass">
          <label
            for="password"
            class="text-primary"
          >密碼</label>
          <input
            type="password"
            id="password"
            placeholder="請輸入密碼"
            :class="inputClass"
            v-model="formData.password"
            @input="error.password = ''"
          >
          <span
            v-show="error.password"
            :class="errorClass"
          >{{ error.password }}</span>
        </div>
        <div :class="fieldGroupClass">
          <label
            for="captcha"
            class="text-primary"
          >驗證碼</label>
          <input
            type="text"
            id="captcha"
            placeholder="請輸入驗證碼"
            :class="inputClass"
            @input="error.captcha = ''"
          >
          <span
            v-show="error.captcha"
            :class="errorClass"
          >{{ error.captcha }}</span>
        </div>
        <div class="flex items-end gap-1">
          <input
            type="text"
            id="random-field"
            disabled
          >
          <img
            src="@/assets/refresh.svg"
            alt="refresh"
            class="w-4 cursor-pointer"
            @click="generateCaptcha"
          >
        </div>
        <div class="mt-[40px] flex justify-center mx-auto">
          <CustomButton
            text="登入"
            class="w-[160px]"
          />
        </div>
        <span
          v-show="error.returnError"
          :class="errorClass"
          class="flex justify-center mt-2"
        >{{ error.returnError }}</span>
      </form>
    </div>
  </UserLayout>
</template>

<script setup>
import { fetchWithoutToken } from '@utils/fetchFn'

const fieldGroupClass = 'flex flex-col mt-8 justify-center'
const inputClass = 'border rounded-md w-[330px] outline-primary h-10 px-2 mt-2'
const errorClass = 'text-red-400'

const formData = reactive({
  username: '',
  password: ''
})

const error = reactive({
  username: '',
  password: '',
  captcha: '',
  returnError: ''
})

const router = useRouter()
const handleSubmit = async () => {
  if (!formData.username) {
    error.username = '帳號不能為空'
  }
  if (!formData.password) {
    error.password = '密碼不能為空'
  }
  if (document.getElementById('captcha').value !== document.getElementById('random-field').value) {
    error.captcha = '驗證碼錯誤'
  }
  if (error.username || error.password || error.captcha) {
    return
  }
  document.getElementById('captcha').value = ''
  generateCaptcha()

  const data = await fetchWithoutToken('/api/auth/local', 'POST', {
    identifier: formData.username,
    password: formData.password
  })

  if (data?.error?.status === 400 && data.error.message === 'Invalid identifier or password') {
    error.returnError = '帳號或密碼錯誤'
    return
  }

  if (data.user.isAdmin) {
    error.returnError = '帳號或密碼錯誤'
    return
    // localStorage.setItem('token', data.jwt)
    // // router.replace('/admin')
    // location.href = '/admin'
    // return
  }

  if (data.user.id) {
    localStorage.setItem('token', data.jwt)
    router.replace('/')
  }
}

onMounted(() => {
  if (localStorage.getItem('token')) {
    router.replace('/')
    return
  }
  generateCaptcha()
})
function generateCaptcha() {
  const chars = '0123456789'
  const string_length = 5

  let captchaCode = ''
  for (var i = 0; i < string_length; i++) {
    const rnum = Math.floor(Math.random() * chars.length)
    captchaCode += chars.substring(rnum, rnum + 1)
  }

  document.getElementById('random-field').value = captchaCode
}
</script>

<style>
#random-field {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  width: 130px;
  color: black;
  border-color: black;
  text-align: center;
  font-size: 30px;
  margin-top: 12px;
  border: 1px black solid;
  opacity: 0.7;

  background-image: url('@/assets/captcha-background.png');
}
</style>