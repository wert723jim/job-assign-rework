<template>
  <Modal ref="createGroupModal">
    <template v-slot:modalTitle>
      新增群組
    </template>
    <template v-slot:modalBody>
      <MemberGroupForm @confirmForm="createGroup"></MemberGroupForm>
    </template>
  </Modal>
  <Modal ref="editGroupModal">
    <template v-slot:modalTitle>
      編輯群組
    </template>
    <template v-slot:modalBody>
      <MemberGroupForm
      :chosen-group-detail="chosenGroupDetail"
      @confirmForm="editGroup">
      </MemberGroupForm>
    </template>
  </Modal>
  <Layout>
    <template v-slot:content>
      <div class="main">
        <div class="search">
          <!-- Button trigger modal -->
          <button type="button" class="btn btn-primary ml-1" @click.prevent="createGroupModal.modalOpen()">
            <i class="iconfont">&#xe665;</i>新增
          </button>
        </div>

        <div class="table-box">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">編號</th>
                <th scope="col">員工群組名稱</th>
                <th scope="col">人數</th>
                <th scope="col">預設群組</th>
                <th scope="col">門檻點數設定</th>
                <th scope="col">功能</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="group in memberGroups" :key="group.id">
                <th scope="row">
                  {{ group.id }}
                </th>
                <td>
                  {{ group.name }}
                </td>
                <td>
                  {{ group.count }}
                </td>
                <td>
                  <input type="checkbox" v-model="group.isDefault" @click.stop.prevent>
                </td>
                <td>
                  {{ group.point_baseline }}
                </td>
                <td class="flex gap-2">
                  <button class="btn btn-primary" @click.prevent="editButtonClick(group)">
                    編輯
                  </button>
                  <button class="btn btn-danger" @click.prevent="removeGroup(group.id)">
                    刪除
                  </button>
                </td>
              </tr>
              </tbody>
          </table>
        </div>

        <div class="page">
          <span class="total float-left page-link">共23223条</span>
          <ul class="pagination">
              <li class="page-item"><a class="page-link" href="#">&lt;&lt;</a></li>
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item"><a class="page-link" href="#">>></a></li>
          </ul>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Layout from '../../components/admin/Layout.vue'
import MemberGroupForm from '../../components/admin/form/MemberGroupForm.vue'
import Modal from '@/components/admin/Modal.vue'
import fetchWithToken from '@utils/fetchFn'
// import alertResult from '@utils/alertResult'

const memberGroups = ref([])
const createGroupModal= ref(null)
const editGroupModal = ref(null)
const chosenGroupDetail = reactive({
  id: 0,
  name: '',
  point_baseline: 0,
  isDefault: false,
})

const fetchMemberGroup = async () => {
  const { data, error } = await fetchWithToken('/api/groups?fields[0]=name&fields[1]=isDefault&fields[2]=point_baseline&populate[users][count]=1')

  if (error) console.log(error)

  memberGroups.value = data.map((item) => ({
    id: item.id,
    isDefault: item.attributes.isDefault,
    name: item.attributes.name,
    point_baseline: item.attributes.point_baseline,
    count: item.attributes.users.data.attributes.count,
  }))
}
fetchMemberGroup()

const createGroup = async (formDetail) => {
  const postBody = {
    data: formDetail
  }
  const { data } = await fetchWithToken('/api/groups', 'POST', postBody)
  if (!data) {
    console.log('create error')
    return
  }
  memberGroups.value.push({
    id: data.id,
    count: 0,
    ...data.attributes,
  })
  createGroupModal.value.modalClose()
}

const editButtonClick = (group) => {
  const { id, name, point_baseline, isDefault } = group
  editGroupModal.value.modalOpen()
  Object.assign(chosenGroupDetail, {
    id,
    name,
    point_baseline,
    isDefault,
  })
}

const editGroup = async (formDetail) => {
  const putBody = {
    data: formDetail
  }
  const { id } = chosenGroupDetail
  const { data } = await fetchWithToken(`/api/groups/${id}`, 'PUT', putBody)
  if (!data) {
    console.log('edit error')
    return
  }
  memberGroups.value = memberGroups.value.map((group) => {
    if (group.id === id) {
      return {
        ...group,
        ...data.attributes,
      }
    }
    return group
  })
  editGroupModal.value.modalClose()
}

const removeGroup = async (id) => {
  if (!confirm(`確定要刪除群組${id}嗎？`)) return
  const { data } = await fetchWithToken(`/api/groups/${id}`, 'DELETE')
  if (!data) {
    console.log('delete error')
    return
  }
  memberGroups.value = memberGroups.value.filter((group) => group.id !== id)
}
</script>
