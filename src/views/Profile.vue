<template>
  <UserLayout>
    <div class="flex justify-center mt-[40px]">
      <form @submit.prevent>
        <div :class="fieldGroupClass">
          <label
            for="username"
            class="text-primary"
          >帳號</label>
          <input
            type="text"
            id="username"
            :class="inputClass"
            v-model="formData.username"
            disabled
          >
        </div>
        <!-- <div :class="fieldGroupClass">
          <label
            for="password"
            class="text-primary"
          >密碼</label>
          <input
            type="text"
            id="password"
            :class="inputClass"
            v-model="formData.password"
          >
        </div> -->
        <div :class="fieldGroupClass">
          <label
            for="nickname"
            class="text-primary"
          >姓名</label>
          <input
            type="text"
            id="nickname"
            :class="inputClass"
            v-model="formData.nickname"
            disabled
          >
        </div>
        <div :class="fieldGroupClass">
          <label
            for="phone"
            class="text-primary"
          >電話</label>
          <input
            type="text"
            id="phone"
            :class="inputClass"
            v-model="formData.phone"
            disabled
          >
        </div>
        <div class="pt-2">
          <span class="text-sm mt-10 text-[#9B9B9B]">若需修改個人資料請洽客服人員</span>
        </div>
      </form>
    </div>
  </UserLayout>
</template>

<script setup>
import fetchWithToken from '../../utils/fetchFn'

const fieldGroupClass = 'flex flex-col mt-8 justify-center'
const inputClass = 'border rounded-md w-[330px] outline-primary h-10 px-2 mt-2 text-gray-400'

const formData = reactive({
  username: '',
  password: '',
  nickname: '',
  phone: '',
})

onMounted(async () => {
  const data = await fetchWithToken('/api/users/me?fields[0]=username&fields[1]=nickname&fields[2]=phone')
  formData.username = data.username
  formData.nickname = data.nickname
  formData.phone = data.phone
})
</script>