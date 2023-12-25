<template>
  <AdminLayout>
    <template v-slot:header>
      <h2 class="font-semibold text-lg px-3 py-2">商品上架</h2>
    </template>
    <template v-slot:content>
      <div class="border-[1px] border-gray-300 h-full">
        <div class="flex items-center gap-2 p-2 border-b-[1px] border-gray-300">
          <div>
            <button class="bg-[#2055A5] text-white px-5 py-1">
              新增商品
            </button>
          </div>
          <div>
            (前台最多顯示16項)
          </div>
        </div>
        <div class="p-2">
          顯示
          <select
            name=""
            id="listItemsCount"
          >
            <option
              value="10"
              selected
            >10</option>
          </select>
          條目
        </div>
        <div>
          <table class="filter-table w-full">
            <thead>
              <tr class="bg-[#7B7B7B] text-white">
                <th>
                  編號
                </th>
                <th>
                  修改排序
                </th>
                <th>
                  商品名稱
                </th>
                <th>
                  創建日期
                </th>
                <th>
                  發布狀態
                </th>
                <th>
                  訂單狀態
                </th>
                <th>
                  功能
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  1
                </td>
                <td>
                  <select
                    name=""
                    id=""
                  >
                    <option
                      value="1"
                      selected
                    >1</option>
                  </select>
                </td>
                <td>
                  歐美影片聽打員
                </td>
                <td>
                  2023-12-16 12:00:02
                </td>
                <td>
                  <select
                    name=""
                    id="productLaunchState"
                  >
                    <option
                      value="1"
                      selected
                    >顯示</option>
                  </select>
                </td>
                <td>
                  額滿
                </td>
                <td>
                  <div class="flex justify-center gap-1">
                    <button class="bg-[#2055A5] text-white px-5 py-1">
                      修改
                    </button>
                    <button class="bg-[#D92F14] text-white px-5 py-1">
                      刪除
                    </button>
                  </div>
                </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
</AdminLayout></template>


<style scoped>.filter-table td,
.filter-table th,
.filter-table {
  @apply border-[1px];
  @apply border-gray-400;
  @apply text-center;
}</style>