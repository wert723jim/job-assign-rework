<script setup>
import { onMounted, reactive } from 'vue'
import { fetchWithoutToken } from '@utils/fetchFn'

const route = useRoute()

const announcement = reactive({
  title: '',
  content: '',
  createdAt: ''
})
onMounted(async () => {
  const { data } = await fetchWithoutToken(`/api/announcements/${route.params.id}`)
  announcement.value = data.title
  Object.assign(announcement, data.attributes)
})
</script>

<template>
  <UserLayout>
    <div
      class="my-6 overflow-y-auto max-h-[800px] pb-[100px] md:pb-0"
      v-if="announcement.title"
    >
      <h1 class="text-2xl m-2 font-bold">{{ announcement.title }}</h1>
      <div class="p-2 border-b">
        {{ announcement.content }}
        <div class="flex justify-end m-2 text-gray-400">
          <span>{{ announcement.createdAt.slice(0, 10) }}</span>
        </div>
      </div>
    </div>
  </UserLayout>
</template>
