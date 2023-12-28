<template>
  <div class="pt-3 text-dark">
    <div class="row">
      <div class="col-10">
        <div class="card">
          <h5 class="card-header">登入查詢</h5>
          <div class="card-body">
           <form>
            <div class="form-group row mb-2">
              <span class="col-form-label mr-2 col-2">查詢時間</span>
              <div class="col-9 flex gap-2">
                <button
                  class="btn btn-primary"
                  v-for="btn in timeBtnGroup"
                  :key="btn"
                  @click.prevent.stop="chosenTime = btn">
                  {{ btn }}
                </button>
              </div>
            </div>
            <div class="form-group row mb-2">
              <span class="col-form-label mr-2 col-2">日期區間</span>
              <div class="input-group col-9">
                <label class="sr-only" for="startDateTime"></label>
                <input type="datetime-local" class="form-control" id="startDateTime">
                <div class="input-group-prepend input-group-append">
                  <label class="input-group-text">-</label>
                </div>
                <label class="sr-only" for="endDateTime"></label>
                <input type="dateTime-local" class="form-control" id="endDateTime">
              </div>
            </div>
            <div class="form-group row mb-2 align-items-center">
              <span class="col-form-label mr-2 col-2">狀態</span>
              <div class="col-9">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="pointState" id="all">
                  <label class="form-check-label" for="all">全部</label>
                </div>

                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="pointState" id="add">
                  <label class="form-check-label" for="add">補點</label>
                </div>

                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="pointState" id="minus">
                  <label class="form-check-label" for="minus">扣點</label>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <div class="mr-2 col-2"></div>
              <div class="col-9">
                <button class="btn btn-primary" @click.stop.prevent="filterPointLogInPeriod">查詢</button>
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
            <div>
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
            </div>
            <div class="table-box">
              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">補扣點時間</th>
                    <th scope="col">點數紀錄</th>
                    <th scope="col">主錢包餘額</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
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
import { ref } from 'vue'
const emit = defineEmits(['filterPointLogInPeriod'])
const chosenTime = ref('')
const timeBtnGroup = [
  '今日',
  '昨日',
  '本週',
  '上週',
  '本月',
  '上月',
]

const filterPointLogInPeriod = () => {
  emit('filterPointLogInPeriod')
}
</script>