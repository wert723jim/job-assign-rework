<template>
  <Layout>
    <template v-slot:content>
      <div class="main">
        <div class="search">
          <a class="btn btn-primary float-right" href="user_create.html"><i class="iconfont">&#xe665;</i>新增</a>
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
                  <button class="btn btn-primary">
                    編輯
                  </button>
                  <button class="btn btn-danger">
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
import Layout from '../../components/admin/Layout.vue'
import fetchWithToken from '@utils/fetchFn'
// import alertResult from '@utils/alertResult'

const memberGroups = ref([])
// const groupDetail = reactive({
//   name: '',
//   pointBaseLine: 0,
//   isDefault: false,
// })

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

// const addGroup = async () => {
//   if (!groupDetail.name) {
//     alert('員工群組名稱不能為空白')
//     throw new Error('員工群組名稱不能為空白')
//   }
//   const { data } = await fetchWithToken('/api/groups', 'POST', {
//     data: {
//       name: groupDetail.name,
//       point_baseline: groupDetail.pointBaseLine
//     }
//   })

//   alertResult(data.id, '新增群組')
//   fetchMemberGroup()
// }

// const toGroupDetail = (name, pointBaseLine, isDefault) => {
//   console.log('click')
//   groupDetail.name = name
//   groupDetail.pointBaseLine = pointBaseLine
//   groupDetail.isDefault = isDefault
// }

// const editGroup = async (id) => {
//   if (!groupDetail.name) {
//     alert('員工群組名稱不能為空白')
//     throw new Error('員工群組名稱不能為空白')
//   }

//   const { data } = await fetchWithToken(`/api/groups/${id}`, 'PUT', {
//     data: {
//       name: groupDetail.name,
//       point_baseline: groupDetail.pointBaseLine
//     }
//   })

//   alertResult(data.id, '編輯群組')
//   fetchMemberGroup()
// }

// const removeGroup = async (id) => {
//   if (!confirm('確定要刪除群組嗎？')) return
//   const { data } = await fetchWithToken(`/api/groups/${id}`, 'DELETE')
//   alertResult(data.id, '刪除群組')
//   fetchMemberGroup()
// }
</script>
