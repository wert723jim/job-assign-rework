<template>
  <div class="pt-3 text-dark">
    <div class="row mb-2">
      <div class="col-10">
        <div class="card">
          <h5 class="card-header">登入查詢</h5>
          <div class="card-body">
            <form>
              <div class="form-group row mb-2">
                <span class="col-form-label mr-2 col-2">日期區間</span>
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
              <div class="form-group row">
                <div class="mr-2 col-2"></div>
                <div class="col-9">
                  <button
                    class="btn btn-primary"
                    @click.stop.prevent="filterPointLogInPeriod"
                  >查詢</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-10">
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
            <div class="table-box">
              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">登入時間</th>
                    <th scope="col">登入IP</th>
                    <th scope="col">登入裝置</th>
                    <th scope="col">狀態</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="loginLog in userLoginLogPeriod"
                    :key="loginLog.id"
                  >
                    <th scope="row">{{ loginLog.id }}</th>
                    <td>
                      <div v-if="loginLog.createdAt">
                        <div>
                          {{ formatDate(loginLog.createdAt) }}
                        </div>
                        <div>
                          {{ formatTime(loginLog.createdAt) }}
                        </div>
                      </div>
                    </td>
                    <td>{{ loginLog.ip }}</td>
                    <td>{{ loginLog.device }}</td>
                    <td>{{ loginLog.isSuccess ? '成功' : '失敗' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatDate, formatTime } from '@utils/formatDateTime'
import { onMounted, reactive } from 'vue'

const props = defineProps({
  userLoginLogPeriod: {
    type: Array,
    default: () => []
  }
})
console.log('userLoginLogPeriod', props.userLoginLogPeriod)
const emit = defineEmits(['filterLogInInPeriod'])

const filterDetail = reactive({
  startDate: '',
  endDate: '',
})

const filterPointLogInPeriod = () => {
  emit('filterLogInInPeriod', { ...filterDetail })
}

onMounted(() => {
  filterPointLogInPeriod()
})
</script>