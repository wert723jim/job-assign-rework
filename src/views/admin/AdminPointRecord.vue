<template>
  <AdminLayout>
    <template v-slot:header>
      <h2 class="font-semibold text-lg px-3 py-2">點數紀錄</h2>
    </template>

    <template v-slot:content>
      <div class="border-[1px] border-gray-300 mb-2">
        <div class="px-6 py-2">
          <div>
            <form>
              <table>
                <tr>
                  <td>
                    查詢時間
                  </td>
                  <td>
                    <label
                      for="todayOption"
                      class="bg-[#3FC0E5] text-white px-4 py-1 mr-2"
                    >
                      今日
                    </label>
                    <label
                      for="yesterdayOption"
                      class="bg-[#3FC0E5] text-white px-4 py-1 mr-2"
                    >
                      昨日
                    </label>
                    <label
                      for="thisWeekOption"
                      class="bg-[#3FC0E5] text-white px-4 py-1 mr-2"
                    >
                      本週
                    </label>
                    <label
                      for="lastWeekOption"
                      class="bg-[#3FC0E5] text-white px-4 py-1 mr-2"
                    >
                      上週
                    </label>
                    <label
                      for="thisMonthOption"
                      class="bg-[#3FC0E5] text-white px-4 py-1 mr-2"
                    >
                      本月
                    </label>
                    <label
                      for="lastMonthOption"
                      class="bg-[#3FC0E5] text-white px-4 py-1 mr-2"
                    >
                      上月
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    登入時間
                  </td>
                  <td>
                    <div class="flex">
                      <input type="datetime-local">
                      <span> - </span>
                      <input type="datetime-local">
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label for="memberName">
                      帳號/姓名
                    </label>
                  </td>
                  <td>
                    <input
                      id="memberName"
                      type="text"
                      class="w-1/2 mr-2"
                    >
                    <label for="memberGroup">
                      員工群組
                    </label>
                    <select
                      name=""
                      id="memberGroup"
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
                    狀態
                  </td>
                  <td class="flex gap-4 items-center">
                    <div>
                      <input
                        id="all"
                        type="radio"
                        name="state"
                        value="all"
                      >
                      <label for="all">
                        全部
                      </label>
                    </div>
                    <div>
                      <input
                        id="addPoint"
                        type="radio"
                        name="state"
                        value="add"
                      >
                      <label for="addPoint">
                        補點
                      </label>
                    </div>
                    <div>
                      <input
                        id="minusPoint"
                        type="radio"
                        name="state"
                        value="minus"
                      >
                      <label for="minusPoint">
                        扣點
                      </label>
                    </div>
                    <div>
                      <button class="bg-[#2055A5] text-white px-5 py-1">
                        查詢
                      </button>
                    </div>
                  </td>
                </tr>
              </table>
            </form>
          </div>
        </div>
      </div>

      <div>
        <div class="bg-[#949DB0]">主錢包紀錄</div>
        <div class="border-x-[1px] border-gray-300">
          <div class="flex p-2">
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
        </div>
        <div>
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
                  點數紀錄
                </th>
                <th>
                  主錢包餘額
                </th>
                <th>
                  異動時間
                </th>
                <th class="w-1/4">
                  事由
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
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
                  +100
                </td>
                <td>
                  1000.00
                </td>
                <td>
                  <div>
                    2023-12-16
                  </div>
                  <div>
                    12:00:02
                  </div>
                </td>
                <td></td>
              </tr>
              <tr class="last-row">
                <td colspan="3"></td>
                <td colspan="2">
                  <span class="inline-block py-3 tracking-[1em] w-full mr-[-1em]">
                    總計
                  </span>
                </td>
                <td>
                  +100
                </td>
                <td colspan="2"></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </AdminLayout>
</template>

<style scoped>
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
}

.filter-table td,
.filter-table th,
.filter-table {
  @apply border-[1px];
  @apply border-gray-400;
  @apply text-center;
}</style>