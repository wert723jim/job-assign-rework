<template>
  <AdminLayout>
    <template v-slot:header>
      <h2 class="font-semibold text-lg px-3 py-2">點數管理</h2>
    </template>
    <template v-slot:content>
      <div class="border-[1px] border-gray-400 px-6 py-4 mb-2">
        <div>
          <form>
            <table>
              <tr>
                <td>
                  <label for="member">
                    帳號/姓名
                  </label>
                </td>
                <td>
                  <input
                    name="member"
                    id="member"
                    type="text"
                  >
                </td>
              </tr>
              <tr>
                <td>
                  <label for="memberGroupName">
                    員工群組
                  </label>
                </td>
                <td>
                  <select
                    name="memberGroupName"
                    id="memberGroupName"
                  >
                    <option
                      value="0"
                      selected
                    >全部</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <button class="bg-[#2055A5] text-white px-5 py-1">查詢</button>
                </td>
                <td></td>
              </tr>
            </table>
          </form>
        </div>
      </div>

      <div>
        <div class="flex p-2 border-[1px] border-gray-400">
          共
          <span>
            220
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
            <tr class="bg-[#7B7B7B] text-white">
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
                狀態
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
                功能
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-center">
              <td>
                1
              </td>
              <td>
                DMP0001
              </td>
              <td>
                張三豐
              </td>
              <td>
                啟用
              </td>
              <td>
                新進
              </td>
              <td>
                1000.00
              </td>
              <td>
                2023-12-16 12:00:02
              </td>
              <td>
                149.120.3.8
              </td>
              <td>
                <button class="bg-[#2055A5] text-white px-5 py-1">
                  修改
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </AdminLayout>
</template>

<style>
form td:first-child {
  @apply text-right;
  @apply pr-2;
}

table td {
  @apply py-1;
}

.filter-table td,
.filter-table th {
  border: 1px solid;
  @apply border-gray-400;
}
</style>