<template>
  <div
    class="md:hidden"
    @click="show = true"
  >
    <img
      src="@/assets/hamburger.svg"
      alt="hamburger"
      class="mr-2 cursor-pointer"
    >
  </div>
  <div
    v-if="show"
    class="absolute top-0 left-0 inset-0 z-40 bg-gray-700 bg-opacity-50 "
    @click="show = false"
  > </div>

  <div
    class="h-[10000px] w-3/4 bg-gray-100 absolute left-0 z-50 flex flex-col inset-0"
    :class="show ? 'ml-0' : '-ml-[100000px]'"
  >
    <div
      class="h-fit m-3 px-3 text-[24px] text-gray-400 cursor-pointer"
      @click="show = false"
    > X </div>
    <router-link
      v-if="!isLogin"
      to="/login"
      :class="navClass"
    >登入</router-link>
    <div
      :class="navBorder"
      v-if="!isLogin"
    ></div>
    <div
      :class="navClass"
      @click="connectCustomService"
    >業主專區</div>
    <div
      :class="navBorder"
      v-if="!isLogin"
    ></div>
    <router-link
      v-if="!isLogin"
      to="/announcement"
      :class="navClass"
    >公告欄</router-link>
    <div :class="navBorder"></div>
    <div
      :class="navClass"
      v-if="!isLogin"
      @click="connectCustomService"
    >註冊</div>

    <!-- show when login -->
    <div v-if="isLogin">
      <div
        :class="navClass"
        @click="router.push('/announcement')"
      >公告欄</div>
      <div :class="navBorder"></div>
      <div
        :class="navClass"
        @click="router.push('/point')"
      >錢包</div>
      <div :class="navBorder"></div>
      <div
        :class="navClass"
        @click="router.push('/profile')"
      >個人資料</div>
      <div :class="navBorder"></div>
      <div
        :class="navClass"
        @click="logout"
      >登出</div>
    </div>


  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { inject } from 'vue'
const connectCustomService = inject('connectCustomService')

const router = useRouter()
const token = localStorage.getItem('token')
const isLogin = !!token

const show = ref(false)
const navClass = 'bg--300 p-5 text-gray-500 cursor-pointer'
const navBorder = 'border-b border-gray-400'

const logout = () => {
  localStorage.setItem('token', '')
  router.replace('/login')
}
</script>