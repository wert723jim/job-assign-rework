<template>
  <UserLayout>
    <div class="place-content-center w-full my-[100px]">
      <div class="text-[18px] flex justify-center text-gray-400">
        目前錢包餘額
      </div>
      <div class="flex justify-center items-center gap-4 mt-4">
        <img
          src="@/assets/wallet.svg"
          alt="wallet"
          class="w-16"
        >
        <span class="text-[30px] text-primary">${{ main_point || 0 }}</span>
      </div>
    </div>
    <div class="mx-auto">
      <span class="text-gray-400">交易紀錄</span>
      <div class="border-b border-gray-300 w-full mt-3"></div>
      <div v-if="pointLogList.length">
        <div
          v-for="log in pointLogList"
          :key="log.id"
          class="flex p-2 border-b border-gray-300  overflow-x-auto"
        >
          <div class="flex max-w-screen-sm">
            <div class="flex flex-col text-center w-[60px]">
              <span
                v-if="log.attributes.edit_point > 0"
                class="text-green-500"
              >入帳</span>
              <span
                v-else
                class="text-red-400"
              >扣款</span>
              <span :class="log.attributes.edit_point > 0 ? 'text-green-500' : 'text-red-400'">
                {{ Math.abs(log.attributes.edit_point) }}
              </span>
            </div>
            <div class="px-4 max-w-[200px]">
              <p>
                {{ log.attributes.cause }}
              </p>
            </div>
          </div>
          <div class="mt-auto ml-auto text-sm text-gray-400">
            交易日期 {{ formatDate(log.attributes.createdAt) }}
          </div>
        </div>
      </div>
      <div
        v-else
        class="text-[#9B9B9B] flex justify-center mt-10"
      >無交易紀錄</div>
    </div>
  </UserLayout>
</template>

<script setup>
import fetchWithToken from '@utils/fetchFn'
import { formatDate } from '@utils/formatDateTime'

const main_point = ref(0)
const pointLogList = ref([])
onMounted(async () => {
  const user = await fetchWithToken('/api/users/me?fields[0]=main_point&fields[1]=id')
  main_point.value = user.main_point
  const pointLogs = await fetchWithToken(`/api/point-logs?populate[0]=user&filters[user][id][$eq]=${user.id}&sort[createdAt]=desc`)
  pointLogList.value = pointLogs.data
})

</script>