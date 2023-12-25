<template>
  <Layout>
    <main class="pl-40 h-full flex flex-col pt-11">
      <div>
        <h2 class="font-semibold text-lg px-3 py-2">員工群組</h2>
      </div>
      <div class="px-3 pb-11 flex-1">
        <div class="h-full border-[1px] border-gray-400 p-2">
          <AdminModal @confirm="addGroup">
            <template v-slot:buttonContent>
              <span
                class="inline-block text-white px-5 py-1 bg-[#2055A5]"
                @click="toGroupDetail('', 0, false)"
              >
                新增員工群組
              </span>
            </template>
            <template v-slot:header>
              新增員工群組
            </template>
            <template v-slot:content>
              <div>
                <form>
                  <div class="flex flex-col">
                    <label for="groupName">
                      群組名稱:
                    </label>
                    <input
                      v-model="groupDetail.name"
                      type="text"
                      id="groupName"
                    >
                  </div>
                  <div class="flex flex-col">
                    <label for="pointBaseLine">
                      門檻點數設定:
                    </label>
                    <input
                      v-model="groupDetail.pointBaseLine"
                      type="number"
                      id="pointBaseLine"
                    >
                  </div>
                </form>
              </div>
            </template>
            <template v-slot:confirmButtonContent>
              新增
            </template>
          </AdminModal>
          <div class="mt-4">
            <table>
              <thead>
                <tr class="bg-[#7B7B7B] text-white">
                  <th>
                    編號
                  </th>
                  <th>
                    員工群組名稱
                  </th>
                  <th>
                    人數
                  </th>
                  <th>
                    預設群組
                  </th>
                  <th>
                    門檻點數設定
                  </th>
                  <th>
                    功能
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="group in memberGroups"
                  :key="group.id"
                  class="text-center"
                >
                  <td>
                    {{ group.id }}
                  </td>
                  <td>
                    {{ group.attributes.name }}
                  </td>
                  <td>
                    0
                  </td>
                  <td>
                    <input
                      name="defaultGroup"
                      type="checkbox"
                      v-model="group.attributes.isDefault"
                      @click.stop.prevent
                    >
                  </td>
                  <td>
                    <div class="border-[1px] border-gray-400 text-center">
                      {{ group.attributes.point_baseline }}
                    </div>
                  </td>
                  <td>
                    <div class="flex gap-2">
                      <AdminModal
                        :group-id="group.id"
                        @confirm="editGroup"
                      >
                        <template v-slot:buttonContent>
                          <span
                            class="inline-block text-white px-5 py-1 bg-[#2055A5]"
                            @click="toGroupDetail(group.attributes.name, group.attributes.point_baseline, group.attributes.isDefault)"
                          >
                            編輯
                          </span>
                        </template>
                        <template v-slot:header>
                          群組編輯
                        </template>
                        <template v-slot:content>
                          <div>
                            <form>
                              <div class="flex flex-col">
                                <label for="groupName">
                                  群組名稱:
                                </label>
                                <input
                                  v-model="groupDetail.name"
                                  type="text"
                                  id="groupName"
                                >
                              </div>
                              <div class="flex flex-col">
                                <label for="pointBaseLine">
                                  門檻點數設定:
                                </label>
                                <input
                                  v-model="groupDetail.pointBaseLine"
                                  type="number"
                                  id="pointBaseLine"
                                >
                              </div>
                              <div class="flex items-center gap-2">
                                <label for="groupDefault">
                                  預設群組
                                </label>
                                <input
                                  type="checkbox"
                                  v-model="groupDetail.isDefault"
                                >
                              </div>
                            </form>
                          </div>
                        </template>
                        <template v-slot:confirmButtonContent>
                          編輯
                        </template>
                      </AdminModal>
                      <button
                        class="bg-red-600 text-white px-5 py-1"
                        @click.stop.prevent="removeGroup(group.id)"
                      >
                        刪除
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </Layout>
</template>

<script setup>
import Layout from '../../components/admin/Layout.vue'
import fetchWithToken from '@utils/fetchFn'
import alertResult from '@utils/alertResult'

const memberGroups = ref([])
const groupDetail = reactive({
  name: '',
  pointBaseLine: 0,
  isDefault: false,
})

const fetchMemberGroup = async () => {
  const { data } = await fetchWithToken('/api/groups?fields[0]=name&fields[1]=isDefault&fields[2]=point_baseline&populate[users][count]=1')
  memberGroups.value = data
}

fetchMemberGroup()

const addGroup = async () => {
  if (!groupDetail.name) {
    alert('員工群組名稱不能為空白')
    throw new Error('員工群組名稱不能為空白')
  }
  const { data } = await fetchWithToken('/api/groups', 'POST', {
    data: {
      name: groupDetail.name,
      point_baseline: groupDetail.pointBaseLine
    }
  })

  alertResult(data.id, '新增群組')
  fetchMemberGroup()
}

const toGroupDetail = (name, pointBaseLine, isDefault) => {
  console.log('click')
  groupDetail.name = name
  groupDetail.pointBaseLine = pointBaseLine
  groupDetail.isDefault = isDefault
}

const editGroup = async (id) => {
  if (!groupDetail.name) {
    alert('員工群組名稱不能為空白')
    throw new Error('員工群組名稱不能為空白')
  }

  const { data } = await fetchWithToken(`/api/groups/${id}`, 'PUT', {
    data: {
      name: groupDetail.name,
      point_baseline: groupDetail.pointBaseLine
    }
  })

  alertResult(data.id, '編輯群組')
  fetchMemberGroup()
}

const removeGroup = async (id) => {
  if (!confirm('確定要刪除群組嗎？')) return
  const { data } = await fetchWithToken(`/api/groups/${id}`, 'DELETE')
  alertResult(data.id, '刪除群組')
  fetchMemberGroup()
}
</script>

<style scoped>
th {
  padding: 8px;
}

td {
  padding: 4px
}

td,
th {
  border: 1px solid;
  @apply border-gray-400;
}

form input {
  @apply border-[1px];
  @apply border-gray-300;
  @apply h-8;
}
</style>