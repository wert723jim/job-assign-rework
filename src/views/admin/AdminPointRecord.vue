<template>
  <Layout>
    <template v-slot:content>
      <div class="pt-3 text-dark">
        <div class="row mb-2">
          <div class="col-10">
            <div class="card">
              <h5 class="card-header">登入查詢</h5>
              <div class="card-body">
              <form>
                <div class="form-group row mb-2">
                  <span class="col-form-label col-auto">日期區間</span>
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

                <div class="form-group row mb-2">
                  <label for="memberInfo" class="col-form-label col-auto">帳號/姓名</label>
                  <div class="col-auto">
                    <input type="text" class="form-control">
                  </div>
                  <label for="memberInfo" class="col-form-label col-auto">員工群組</label>
                  <div class="col-auto">
                    <select name="" id="" class="form-control">
                      <option value="">123</option>
                    </select>
                  </div>
                </div>

                <div class="form-group">
                  
                </div>
                <div class="form-group row mb-2 align-items-center">
                  <span class="col-form-label col-auto">狀態</span>
                  <div class="col-auto">
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
                    <button class="btn btn-primary">查詢</button>
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
                      <tr>
                        <th scope="row"></th>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td colspan="3"></td>
                        <td colspan="2" class="text-center">總計</td>
                        <td>100</td>
                        <td></td>
                        <td></td>
                        <td></td>
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
  </Layout>
</template>

<script setup>
import Layout from '../../components/admin/Layout.vue'
import fetchWithToken from '@utils/fetchFn.js'
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
const fetchMember = async () => {
  const data = await fetchWithToken('/api/point-logs?filters[$or][0][username][$contains]={admin}')
  console.log(data)
}
fetchMember()
</script>