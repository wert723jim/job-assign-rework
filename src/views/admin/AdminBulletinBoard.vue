<template>
  <AdminLayout>
    <template v-slot:header>
      <h2 class="font-semibold text-lg px-3 py-2">公告欄</h2>
    </template>

    <template v-slot:content>
      <div class="border-[1px] border-gray-300 h-full">
        <div class="flex items-center gap-2 p-2 border-b-[1px] border-gray-300">
          <div>
            <AdminModal>
              <template v-slot:buttonContent>
                <span>
                  <span
                    class="inline-block text-white px-5 py-1 bg-[#2055A5]"
                  >
                    新增公告
                  </span>
                </span>
              </template>
              <template v-slot:header>
                新增公告
              </template>
              <template v-slot:content>
                <BulletinBoardForm @confirm="addAnnouncement">
                  <template v-slot:formButton>
                    <span class="bg-[#2055A5] text-white px-5 py-1">
                      新增
                    </span>
                  </template>
                </BulletinBoardForm>
              </template>
            </AdminModal>
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
                  創建日期
                </th>
                <th>
                  公告標題
                </th>
                <th>
                  公告狀態
                </th>
                <th>
                  跑馬燈顯示
                </th>
                <th>
                  功能
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="announcement in announcements" :key="announcement.id">
                <td>
                  {{ announcement.id}}
                </td>
                <td>
                  {{ announcement.createdAt}}
                </td>
                <td>
                  {{ announcement.title }}
                </td>
                <td>
                  <select name="bulletinState" v-model="announcement.isActive">
                    <option value="true" selected>啟用</option>
                    <option value="false">停用</option>
                  </select>
                </td>
                <td>
                  <select name="newsTickerState" v-model="announcement.isMarquee" @click.prevent.stop>
                    <option value="true" selected>啟用</option>
                    <option value="false">停用</option>
                  </select>
                </td>
                <td>
                  <div class="flex justify-center gap-1">
                    <AdminModal>
                      <template v-slot:buttonContent>
                        <span>
                          <span
                            class="inline-block text-white px-5 py-1 bg-[#2055A5]"
                          >
                            修改
                          </span>
                        </span>
                      </template>
                      <template v-slot:header>
                        修改公告
                      </template>
                      <template v-slot:content>
                        <BulletinBoardForm 
                          @confirm="editAnnouncement"
                          :id ="announcement.id"
                          :title="announcement.title"
                          :content="announcement.content"
                          :isActive="announcement.isActive"
                          :isMarquee="announcement.isMarquee"
                        >
                          <template v-slot:formButton>
                            <span class="bg-[#2055A5] text-white px-5 py-1">
                              修改
                            </span>
                          </template>
                        </BulletinBoardForm>
                      </template>
                    </AdminModal>
                    <button @click.prevent.stop="removeAnnouncement(announcement.id)" class="bg-[#D92F14] text-white px-5 py-1">
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
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import fetchWithToken from '@utils/fetchFn'
import BulletinBoardForm from '../../components/admin/form/BulletinBoardForm.vue'
import AdminModal from '../../components/admin/Modal.vue'
import AdminLayout from '../../components/admin/Layout.vue'

const announcements = ref([])

const fetchAnnouncements = async () => {
  const { data } = await fetchWithToken('/api/announcements')
  announcements.value = data.map(d => ({
    id: d.id,
    ...d.attributes,
  }))
}
fetchAnnouncements()

const addAnnouncement = async (formDetail) => {
  delete formDetail['id']
  const postBody = {
    data: formDetail
  }
  const { data } = await fetchWithToken('/api/announcements', 'POST', postBody)
  console.log(data)
}

const editAnnouncement = async (formDetail) => {
  const postBody = {
    data: formDetail
  }
  const { data } = await fetchWithToken(`/api/announcements/${formDetail.id}`, 'PUT', postBody)
  console.log(data)
  if (!data) return 
  announcements.value = announcements.value.map(announcement => {
    if (announcement.id === data.id) {
      return {
        id: data.id,
        ...data.attributes,
      }
    }
    return announcement
  })
}
const removeAnnouncement = async (id) => {
    const confirmRemove = confirm(`確定刪除公告編號${id}?`)

    if (!confirmRemove) return

    const { data } = await fetchWithToken(`/api/announcements/${id}`, 'DELETE')
    if (data) {
      announcements.value = announcements.value.filter(announcement => announcement.id !== data.id)
    }
}
</script>

<style scoped>
.filter-table td, .filter-table th, .filter-table {
  @apply border-[1px];
  @apply border-gray-400;
  @apply text-center;
}</style>