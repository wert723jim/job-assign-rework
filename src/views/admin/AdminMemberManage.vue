<template>
  <AdminLayout>
    <template v-slot:header>
      <h2 class="font-semibold text-2xl px-3 py-2">員工管理</h2>
      <AdminModal @confirm="addMember">
        <template v-slot:buttonContent>
          <span class="inline-block text-sm ml-4 text-white px-5 py-1 bg-[#2055A5]">
            新增員工
          </span>
        </template>
        <template v-slot:header>
          新增員工
        </template>
        <template v-slot:content>
          <div>
            <form>
              <table>
                <tr>
                  <td>
                    <label for="memberUserName">
                      員工帳號
                      <span class="text-red-400 -ml-1">*</span>
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="memberUserName"
                      v-model="memberDetail.username"
                    >
                  </td>
                </tr>
                <tr>
                  <td>
                    <label for="memberPassword">
                      登入密碼
                      <span class="text-red-400 -ml-1">*</span>
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="memberPassword"
                      v-model="memberDetail.password"
                    >
                  </td>
                </tr>
                <tr>
                  <td>
                    <label for="memberNickName">
                      員工姓名
                      <span class="text-red-400 -ml-1">*</span>
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="memberNickName"
                      v-model="memberDetail.nickname"
                    >
                  </td>
                </tr>
                <tr>
                  <td>
                    <label for="memberPhone">
                      電話
                      <span class="text-red-400 -ml-1">*</span>
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="memberPhone"
                      v-model="memberDetail.phone"
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
                      name=""
                      id="memberGroup"
                      class="mx-3 min-w-[70px] text-sm bg-gray-300 p-1 rounded-xl"
                      v-model="memberDetail.group"
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
                    <label for="memberLineId">
                      Line ID
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="memberLineId"
                      v-model="memberDetail.line_id"
                    >
                  </td>
                </tr>
                <tr>
                  <td class="flex justify-end">
                    <label for="memberNote">
                      備註
                    </label>
                  </td>
                  <td>
                    <textarea
                      type="text"
                      id="memberNote"
                      class="resize-none"
                      v-model="memberDetail.note"
                    >
                    </textarea>
                  </td>
                </tr>
              </table>
            </form>
          </div>
        </template>
        <template v-slot:confirmButtonContent>
          新增
        </template>
      </AdminModal>
    </template>
    <template v-slot:content>
      <div class="flex flex-col gap-2">
        <div class="border-[1px] border-gray-400 px-6 py-4">
          <div>
            <AdminSearchForm :groupOptions="groupOptions" />
          </div>
        </div>
        <div>
          <div class="flex p-2 border-[1px] border-gray-400">
            共
            <span>
              {{ pagination.allCount }}
            </span>
            筆資料，總頁數
            <span>
              5
            </span>
            頁 每頁筆數:
            <div>
              <select name="itemsCount">
                <option
                  value="50"
                  selected
                >50</option>
              </select>
            </div>
            目前第:
            <div>
              <select name="chosenPage">
                <option
                  value="1"
                  selected
                >1</option>
              </select>
            </div>
            頁
          </div>
          <table class="filter-table w-full">
            <thead>
              <tr class="bg-[#7B7B7B] text-white whitespace-nowrap">
                <th>
                  編號
                </th>
                <th>
                  員工帳號
                </th>
                <th>
                  姓名
                </th>
                <th>
                  電話
                </th>
                <th>
                  群組
                </th>
                <th>
                  主錢包餘額
                </th>
                <th>
                  註冊日期
                </th>
                <th>
                  最近登入IP
                </th>
                <th>
                  備註
                </th>
                <th>
                  功能
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="member in members"
                :key="member.id"
                class="text-center"
              >
                <td>
                  {{ member.id }}
                </td>
                <td>
                  {{ member.username }}
                </td>
                <td>
                  {{ member.nickname }}
                </td>
                <td>
                  {{ member.phone }}
                </td>
                <td>
                  <span v-if="member.group">
                    {{ member.group.name }}
                  </span>
                </td>
                <td>
                  {{ member.main_point }}
                </td>
                <td>
                  <div class="flex flex-col  whitespace-nowrap">
                    <span>{{ formatDate(member.createdAt) }}</span>
                    <span>{{ formatTime(member.createdAt) }}</span>
                  </div>
                </td>
                <td>

                </td>
                <td>
                  {{ member.note }}
                </td>
                <td>
                  <router-link
                    class="bg-[#2055A5] text-white px-5 py-1 whitespace-nowrap"
                    :to="{ name: 'AdminMember', params: { memberId: member.id } }"
                  >
                    修改
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </AdminLayout>
</template>

<script setup>
import getFilterQuery from '@utils/getFilterQuery'
import fetchWithToken, { fetchWithoutToken } from '@utils/fetchFn'
import { formatDate, formatTime } from '@utils/formatDateTime'
import qs from 'qs'

const memberDetail = reactive({
  username: '',
  password: '',
  nickname: '',
  phone: '',
  group: undefined,
  line_id: '',
  note: '',
})

const groupOptions = ref([])
onMounted(async () => {
  const { data } = await fetchWithToken('/api/groups?fields[0]=name&fields[1]=isDefault')
  groupOptions.value = data?.map(group => ({ id: group.id, name: group.attributes.name }))
  memberDetail.group = data?.find(group => group.attributes.isDefault).id
})

const route = useRoute()
watch(() => route.query, () => fetchMembers(route.query))

const pagination = reactive({
  page: 1,
  pageSize: 10,
  allCount: 0
})
const queryString = qs.stringify({
  fields: ['username', 'nickname', 'phone', 'main_point', 'createdAt', 'note'],
  populate: {
    group: {
      fields: ['name']
    },
    login_logs: true
  },
  sort: ['id'],
  // start: 2,
  // limit: 2
})

const members = ref([])
const fetchMembers = async (query) => {
  const { filterQuery, countFilterQuery } = getFilterQuery(query)
  console.log(countFilterQuery)
  pagination.allCount = await fetchWithToken(`/api/users/count?${countFilterQuery}`)
  members.value = await fetchWithToken(`/api/users?${queryString}${filterQuery}`)
}

fetchMembers(route.query)

const addMember = async () => {
  try {
    let { username, password, nickname, phone, group, line_id, note } = memberDetail
    if (!username || !password || !nickname || !phone || group === 0) {
      alert('欄位不得為空白')
      throw new Error('欄位不得為空白')
    }

    group = Number(group)
    const data = await fetchWithoutToken('/api/auth/local/register', 'POST', {
      username,
      password,
      nickname,
      phone,
      group,
      line_id,
      note,
    })
    if (data?.error) throw new Error(data.error.message)
    members.value.push({
      id: data?.user.id || 0,
      username,
      nickname,
      phone,
      group,
      main_point: 0,
      note,
      createdAt: data.user.createdAt,
    })
    fetchMembers(route.query)

  } catch (err) {
    console.log(err)
  }
}
</script>

<style scoped>
.filter-table th {
  padding: 8px;
}

.filter-table td {
  padding: 4px
}

.filter-table td,
.filter-table th {
  border: 1px solid;
  @apply border-gray-400;
}

form td {
  @apply py-1;
}

form input,
form textarea {
  @apply border-[1px];
  @apply border-gray-300;
  @apply h-8;
}

form table label {
  @apply pr-1;
  @apply inline-block;
  @apply text-right;
  @apply w-full;
}

input {
  padding: 0 8px;
}
</style>