<template>
  <div class="bg-[#F1F1F1] text-[#89A5EE] rounded-lg h-10 w-full md:-mb-9 overflow-hidden">
    <div
      ref="marquee"
      class="flex items-center justify-end px-3 h-full"
    >
      <div
        v-for="an in announcementList"
        :key="an.id"
        class="cursor-pointer whitespace-nowrap -mr-[100px]"
        @click="$router.push(`/announcement/${an.id}`)"
      >
        {{ an.attributes.title }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { fetchWithoutToken } from '@utils/fetchFn.js'
import gsap from 'gsap'
import { computed } from 'vue'
const marquee = ref(null)

const announcementList = ref([])
const gsapX = computed(() => window.innerWidth + 100)
onMounted(async () => {
  const { data } = await fetchWithoutToken('/api/announcements?fields[0]=title')
  announcementList.value = data
  // announcementList.value = [...Array(100).fill([...data])].flat()
  gsap.to(marquee.value, {
    x: -gsapX.value,
    duration: 20,
    repeat: -1,
    ease: 'none',
  })
})
</script>