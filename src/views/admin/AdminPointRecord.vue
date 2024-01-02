<template>
  <Layout>
    <template v-slot:content>
      <div class="pt-3 text-dark main">
        <div class="mb-2">
          <div class="card">
            <h5 class="card-header">登入查詢</h5>
            <div class="card-body">
              <form @submit.prevent.stop="fetchMembers">
                <div class="form-group row mb-2">
                  <span class="col-form-label col-auto">日期區間</span>
                  <div class="input-group col-9">
                    <label
                      class="sr-only"
                      for="startDateTime"
                    ></label>
                    <input
                      type="datetime-local"
                      class="form-control"
                      id="startDateTime"
                      v-model="filterDetail.startDate"
                    >
                    <div class="input-group-prepend input-group-append">
                      <label class="input-group-text">-</label>
                    </div>
                    <label
                      class="sr-only"
                      for="endDateTime"
                    ></label>
                    <input
                      type="dateTime-local"
                      class="form-control"
                      id="endDateTime"
                      v-model="filterDetail.endDate"
                    >
                  </div>
                </div>

                <div class="form-group row mb-2">
                  <label
                    for="memberInfo"
                    class="col-form-label col-auto"
                  >帳號/姓名</label>
                  <div class="col-auto">
                    <input
                      type="text"
                      class="form-control"
                      v-model="filterDetail.info"
                    >
                  </div>
                  <label
                    for="memberInfo"
                    class="col-form-label col-auto"
                  >員工群組</label>
                  <div class="col-auto">
                    <select
                      name=""
                      id=""
                      class="form-control"
                      v-model="filterDetail.group"
                    >
                      <option :value="null">無</option>
                      <option
                        :value="option.id"
                        v-for="option in groupOptions"
                        :key="option.id"
                      >{{ option.name }}</option>
                    </select>
                  </div>
                </div>

                <div class="form-group">

                </div>
                <div class="form-group row mb-2 align-items-center">
                  <span class="col-form-label col-auto">狀態</span>
                  <div class="col-auto">
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="pointState"
                        id="all"
                        v-model="filterDetail.pointState"
                        value="all"
                      >
                      <label
                        class="form-check-label"
                        for="all"
                      >全部</label>
                    </div>

                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="pointState"
                        id="add"
                        v-model="filterDetail.pointState"
                        value="add"
                      >
                      <label
                        class="form-check-label"
                        for="add"
                      >補點</label>
                    </div>

                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="pointState"
                        id="minus"
                        v-model="filterDetail.pointState"
                        value="minus"
                      >
                      <label
                        class="form-check-label"
                        for="minus"
                      >扣點</label>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="mr-2"></div>
                  <div class="col-9">
                    <button
                      class="btn btn-primary"
                      type="submit"
                    >查詢</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>


        <div class="card">
          <h5 class="card-header">主錢包紀錄</h5>
          <div class="card-body p-0">
            <!-- <div>
              <div class="flex text-dark p-2">
                共
                <span>
                  1
                </span>
                筆資料，總頁數
                <span>
                  1
                </span>
                頁 每頁筆數:
                <div>
                  <select name="itemsCount">
                    <option value="10" selected>
                      10
                    </option>
                  </select>
                </div>
                目前第:
                <div>
                  <select name="chosenPage">
                    <option>
                      1
                    </option>
                  </select>
                </div>
                頁
              </div>
            </div> -->
          </div>
        </div>


        <div class="table-box">
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">編號</th>
                <th scope="col">員工帳號</th>
                <th scope="col">姓名</th>
                <th scope="col">狀態</th>
                <th scope="col">群組</th>
                <th scope="col">點數紀錄</th>
                <th scope="col">主錢包餘額</th>
                <th scope="col">異動時間</th>
                <th scope="col">事由</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="log in pointLogs"
                :key="log.id"
              >
                <th scope="row">{{ log.id }}</th>
                <td>{{ log.username }}</td>
                <td>{{ log.nickname }}</td>
                <td>{{ log.isActive }}</td>
                <td>{{ log.group }}</td>
                <td
                  class="flex"
                  :class="{ 'text-success': log.edit_point > 0, 'text-danger': log.edit_point < 0 }"
                >

                  <span v-if="log.edit_point > 0">+</span>
                  {{ log.edit_point }}
                </td>
                <td>{{ log.balance }}</td>
                <td>
                  <div>
                    {{ formatDate(log.createdAt) }}
                  </div>
                  <div>
                    {{ formatTime(log.createdAt) }}
                  </div>
                </td>
                <td scope="row">{{ contentSubString(log.cause) }}</td>
              </tr>
              <tr>
                <td colspan="3"></td>
                <td
                  colspan="2"
                  class="text-center"
                >總計</td>
                <td
                  class="flex"
                  :class="{ 'text-success': totalPoints > 0, 'text-danger': totalPoints < 0 }"
                >
                  <span v-if="totalPoints > 0">+</span>
                  {{ totalPoints }}
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import Layout from '../../components/admin/Layout.vue'
import fetchWithToken from '@utils/fetchFn.js'
import { formatDate, formatTime } from '@utils/formatDateTime'
// import qs from 'qs'
// /api/login-logs?filters[users]=14&filters[$and][0][createdAt][$gt]=2023-12-19T06:20:40Z&filters[$and][1][createdAt][$lt]=2023-12-19T08:50:00Z
// const queryString = qs.stringify({
//   fields: ['username', 'nickname', 'phone', 'main_point', 'createdAt', 'note', 'isActive'],
//   populate: {
//     group: {
//       fields: ['name']
//     },
//     login_logs: true
//   },
//   sort: ['id'],
//   // start: 2,
//   // limit: 2
// })
const filterDetail = reactive({
  startDate: '',
  endDate: '',
  info: '',
  group: null,
  pointState: 'all',
})
const pointLogs = ref([])
const groupOptions = ref([])

const fetchGroupOptions = async () => {
  const { data } = await fetchWithToken('/api/groups?fields[0]=name&fields[1]=isDefault')
  groupOptions.value = data.map((group) => ({
    id: group.id,
    name: group.attributes.name,
  }))
}

// GET /api/users?fields[0]=username&fields[1]=nickname&fields[2]=phone&fields[3]=main_point&fields[4]=createdAt&fields[5]=note&populate[group][fields]=name&populate[login_logs][sort]=createdAt%3Adesc&filters[$or][0][username][$contains]={"username"}&filters[$or][1][nickname][$contains]={"nickname"}&filters[$or][2][phone][$contains]={"phone"}
const fetchMembers = async () => {
  let queryString = ''
  if (filterDetail.startDate) {
    console.log('start')
    queryString += `&filters[$and][0][createdAt][$gt]=${filterDetail.startDate}`
  }

  if (filterDetail.startDate && filterDetail.endDate) {
    queryString += `&filters[$and][1][createdAt][$lt]=${filterDetail.endDate}`
  }

  if (filterDetail.info) {
    queryString += `&filters[$or][2][user][username][$contains]=${filterDetail.info}&filters[$or][3][user][nickname][$contains]=${filterDetail.info}`
  }

  if (filterDetail.group) {
    queryString += `&filters[user][group][id][$eq]=${filterDetail.group}`
  }

  if (filterDetail.pointState === 'all') {
    queryString += '&filters[$and][4][edit_point][$lt|$gt]=0'
  } else if (filterDetail.pointState === 'add') {
    queryString += '&filters[$and][4][edit_point][$gt]=0'
  } else {
    queryString += '&filters[$and][4][edit_point][$lt]=0'
  }

  const { data } = await fetchWithToken(`/api/point-logs?populate[0]=user&populate[1]=user.group${queryString}&filters[user][isAdmin]=false&sort[createdAt]=desc`)
  pointLogs.value = data.map((item) => ({
    id: item.id,
    username: item.attributes.user.data?.attributes.username || '查無此人',
    nickname: item.attributes.user.data?.attributes.nickname || '查無此人',
    isActive: item.attributes.user.data?.attributes.isActive || '查無此人',
    group: item.attributes.user.data?.attributes.group?.data.attributes.name || '查無群組',
    edit_point: item.attributes.edit_point,
    balance: item.attributes.balance,
    createdAt: item.attributes.createdAt,
    cause: item.attributes.cause,
  }))
}

const totalPoints = computed(() => {
  let total = 0
  pointLogs.value.forEach((log) => {
    total += log.edit_point
  })
  return total
})

const contentSubString = (content) => {
  if (content.length < 40) return content
  return content.substring(0, 40) + '...'
}

onMounted(() => {
  fetchGroupOptions()
  fetchMembers()
})
</script>