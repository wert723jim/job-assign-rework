<template>
  <div class="w-[345px] h-[35px] relative ">
    <img
      src="@/assets/search.svg"
      alt="logo"
      class="p-1 ml-1 absolute z-10 mt-0.5"
    >
    <input
      type="text"
      v-model="keyword"
      class="absolute bg-gray-100 rounded-lg top-0 h-full w-full outline-primary pl-9 text-gray-400"
    >
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const keyword = ref('')
const router = useRouter()
let timeId
watch(keyword, () => {
  clearTimeout(timeId)
  timeId = setTimeout(() => {
    if (!keyword.value) {
      router.push('/')
      return
    }
    router.push(`/?search=${keyword.value}`)
  }, 1000)
})
</script>