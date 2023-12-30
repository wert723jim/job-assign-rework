<template>
  <div class="bg-[#F1F1F1] text-[#89A5EE] rounded-lg h-10 w-full md:-mb-9 overflow-hidden">
    <div
      ref="marquee"
      class="flex items-center gap-5 px-3 h-full"
    >
      <div
        v-for="an in announcementList"
        :key="an.id"
        class="cursor-pointer whitespace-nowrap"
        @click="$router.push(`/announcement/${an.id}`)"
      >
        {{ an.attributes.title }}
      </div>
    </div>
  </div>
</template>

<script setup>
import gsap from 'gsap'
const marquee = ref(null)

const announcementList = ref([])
onMounted(async () => {
  const baseUrl = import.meta.env.VITE_BACKEND_HOST
  const res = await fetch(baseUrl + '/api/announcements?fields[0]=title')
  const { data } = await res.json()
  announcementList.value = [...Array(100).fill([...data])].flat()
  gsap.to(marquee.value, {
    x: -1000,
    duration: 24,
    repeat: -1,
    ease: 'none',
  })
})
</script>