<template>
  <UserHeader />
  <main class="px-4  md:px-[67px] h-fit ">
    <div class="flex-1">
      <slot></slot>
    </div>
  </main>
  <div class="h-10 w-full absolute bottom-0 bg-[#5D6279] text-white flex justify-center items-center text-[10px] mt-10">
    2023 Dispatch Matching Platform 版權所有
  </div>
</template>


<script setup>
import UserHeader from '@/components/user/Header.vue'
</script>
