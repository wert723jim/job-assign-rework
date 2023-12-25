<script setup>
import fetchWithToken from '@utils/fetchFn'
import alertResult from '@utils/alertResult'
import formatDateTime from '@utils/formatDateTime'
const route = useRoute()

const groupOptions = ref([])
onMounted(async () => {
  const { data } = await fetchWithToken('/api/groups?fields[0]=name&fields[1]=isDefault')
  groupOptions.value = data?.map(group => ({ id: group.id, name: group.attributes.name }))
  fetchMemberById()
  fetchUserPointLog()
})

const userInfo = reactive({
  username: '',
  nickname: '',
  phone: '',
  isActive: 'false',
  group: undefined,
  line_id: '',
  note: '',
  createdAt: '',
  main_point: 0
})
const fetchMemberById = async () => {
  const data = await fetchWithToken(`/api/users/${route.params.memberId}?populate[group][fields]=name`)
  Object.assign(userInfo, data)
  userInfo.group = data.group.id
  userInfo.isActive = String(data.isActive)
}

const pointLog = reactive({
  add: 0,
  minus: 0,
})
const fetchUserPointLog = async () => {
  const data = await fetchWithToken(`/api/point-log/${route.params.memberId}`)
  Object.assign(pointLog, data)
}

const handleSubmit = async () => {
  const data = await fetchWithToken(`/api/users/${route.params.memberId}`, 'PUT', userInfo)
  alertResult(data.id, '修改')
}

// reset password
const newPassword = ref('')
const resetPassword = async () => {
  const data = await fetchWithToken(`/api/users/${route.params.memberId}`, 'PUT', {
    password: newPassword.value
  })
  alertResult(data.id, '重設登入密碼')
}

defineExpose({ username: userInfo.username })
</script>

<template>
  <div class="border-[1px] border-gray-300 col-start-1 col-span-5 row-start-1 row-span-4">
    <div class="bg-[#949DB0] pl-2">帳號資料</div>
    <div class="px-6 py-1">
      <form
        id="memberInfo"
        @submit.prevent="handleSubmit"
      >
        <table>
          <tr>
            <td>
              員工帳號
            </td>
            <td>
              <input
                :value="userInfo.username"
                class="bg-[#C4C4C4] w-full h-8"
                disabled
              />
            </td>
          </tr>
          <tr>
            <td>
              <label for="memberName">
                姓名
              </label>
            </td>
            <td>
              <input
                id="memberName"
                type="text"
                v-model="userInfo.nickname"
              >
            </td>
          </tr>
          <tr>
            <td>
              <label for="memberPhoneNumber">
                電話
              </label>
            </td>
            <td>
              <input
                id="memberPhoneNumber"
                type="text"
                v-model="userInfo.phone"
              >
            </td>
          </tr>
          <tr>
            <td>
              <label for="memberGroup">
                員工群組
              </label>
            </td>
            <td>
              <select
                id="memberGroup"
                class="mx-3 min-w-[70px] text-sm bg-gray-300 p-1 rounded-xl"
                v-model="userInfo.group"
              >
                <option
                  v-for="group in groupOptions"
                  :key="group.id"
                  :value="group.id"
                >{{ group.name }}</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label for="memberState">
                狀態
              </label>
            </td>
            <td>
              <select
                id="memberState"
                class="mx-3 min-w-[70px] text-sm bg-gray-300 p-1 rounded-xl"
                v-model="userInfo.isActive"
              >
                <option value="">全部</option>
                <option value="true">啟用</option>
                <option value="false">停用</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <span>
                註冊日期
              </span>
            </td>
            <td>
              <span class="inline-block leading-8 w-full h-8 border-[1px] border-gray-300 bg-[#C4C4C4]">
                <input
                  :value="formatDateTime(userInfo.createdAt)"
                  class="bg-[#C4C4C4] w-full h-8"
                  disabled
                />
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <label for="memberLineId">
                Line ID
              </label>
            </td>
            <td>
              <input
                id="memberLineId"
                type="text"
                v-model="userInfo.line_id"
              >
            </td>
          </tr>
          <tr>
            <td class="flex justify-end">
              <label for="memberDescription">
                備註
              </label>
            </td>
            <td>
              <textarea
                id="memberDescription"
                cols="30"
                rows="5"
                class="resize-none px-2"
                v-model="userInfo.note"
              ></textarea>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button class="bg-[#2055A5] text-white px-5 py-1">
                修改
              </button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  </div>
  <div class="border-[1px] border-gray-300 col-start-6 col-span-5  row-start-1 row-span-1">
    <div class="bg-[#87AE91] pl-2">錢包紀錄</div>
    <div class="px-6 py-1">
      <div class="flex items-center">
        <span class="basis-1/4 text-right mr-2">
          主錢包點數
        </span>
        <span class="inline-block basis-1/2 leading-8 h-8 border-[1px] border-gray-300 bg-[#C4C4C4] text-right pr-4">
          {{ userInfo.main_point }}
        </span>
      </div>
    </div>
  </div>
  <div class="border-[1px] border-gray-300 col-start-6 col-span-5 row-start-2 row-span-1">
    <div class="bg-[#87AE91] pl-2">點數資訊</div>
    <div class="px-6 py-1 flex flex-col gap-2">
      <div class="flex items-center">
        <span class="basis-1/4 text-right mr-2">
          補點總和
        </span>
        <span class="inline-block basis-1/2 leading-8 h-8 border-[1px] border-gray-300 bg-[#C4C4C4] text-right pr-4">
          {{ pointLog.add }}
        </span>
      </div>
      <div class="flex items-center">
        <span class="basis-1/4 text-right mr-2">
          扣點總和
        </span>
        <span class="inline-block basis-1/2 leading-8 h-8 border-[1px] border-gray-300 bg-[#C4C4C4] text-right pr-4">
          {{ pointLog.minus }}
        </span>
      </div>
    </div>
  </div>
  <div class="border-[1px] border-gray-300 col-start-6 col-span-5 row-start-4 row-span-1">
    <div class="bg-[#87AE91] pl-2">密碼管理</div>
    <div class="px-6 py-1">
      <div class="text-center flex flex-col justify-center gap-3 my-3">
        <input
          type="password"
          class="border-[1px] border-gray-300 w-1/2 h-8 mx-auto"
          v-model="newPassword"
        >
        <button
          class="bg-[#2055A5] text-white px-5 py-1 w-1/2 mx-auto"
          @click="resetPassword"
        >
          重設登入密碼
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.active {
  @apply bg-[#949DB0];
}

form tr td {
  @apply py-1;
}

form tr td:first-child {
  @apply text-right;
  @apply pr-2;
}

form tr td input[type='text'],
form tr td input[type='dateTime-local'] {
  @apply border-[1px];
  @apply border-gray-300;
  @apply h-8;
  @apply w-full
}

form tr td textarea {
  @apply border-[1px];
  @apply border-gray-300;
}

.filter-table td,
.filter-table th {
  @apply border-[1px];
  @apply border-gray-400;
  @apply text-center;
  @apply p-2;
}

input {
  padding: 0 8px;
}
</style>