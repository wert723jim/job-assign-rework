<template>
  <UserLayout>
    <div class="place-content-center w-full h-full my-[300px]">
      <div class="text-[30px] flex justify-center text-gray-400">
        找不到頁面
      </div>
      <div class="flex justify-center mt-3">
        <CustomButton
          text="返回"
          class="text-[20px] h-10 w-[200px]"
          @click="router.back()"
        />
      </div>
    </div>
  </UserLayout>
</template>

<script setup>
import CustomButton from '@/components/CustomButton.vue'
import UserLayout from '@/components/user/Layout.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>