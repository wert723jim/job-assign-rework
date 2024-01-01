<template>
  <Modal ref="createMemberModal">
    <template v-slot:modalTitle>
      新增員工
    </template>
    <template v-slot:modalBody>
      <CreateMemberForm
        @confirmForm="createMember"
        :group-options="groupOptions"
      >
      </CreateMemberForm>
    </template>
  </Modal>
  <Layout>
    <template v-slot:content>
      <div class="main">
        <div class="search">
          <div>
            <form
              class="float-left text-dark"
              @submit.prevent.stop="filterMembers"
            >
              <div class="form-group">
                <label for="infoKeyWords">帳號/姓名/電話</label>
                <input
                  v-model="filterDetail.info"
                  type="text"
                  class="form-control"
                  id="infoKeyWords"
                >
              </div>

              <div class="form-group">
                <label for="memberGroup">員工群組</label>
                <select
                  id="memberGroup"
                  v-model="filterDetail.group"
                >
                  <option value="0">全部</option>
                  <option
                    v-for="option in groupOptions"
                    :key="option.id"
                    :value="option.id"
                  >{{ option.name }}</option>
                </select>
              </div>

              <div class="form-group">
                <label for="memberState">員工狀態</label>
                <select
                  id="memberState"
                  v-model="filterDetail.isActive"
                >
                  <option value="">全部</option>
                  <option value="true">啟用</option>
                  <option value="false">停用</option>
                </select>
              </div>

              <button
                type="submit"
                class="btn btn-primary"
              >查詢</button>
            </form>
          </div>
          <!-- Button trigger modal -->
          <button
            type="button"
            class="btn btn-primary float-right mr-1"
            @click.prevent="createMemberModal.modalOpen()"
          >
            <i class="iconfont">&#xe665;</i>新增
          </button>
        </div>

        <!-- <div>
          <div class="flex text-dark p-2">
            共
            <span>
              {{ pagination.allCount }}
            </span>
            筆資料，總頁數
            <span>
              {{ pagination.page }}
            </span>
            頁 每頁筆數:
            <div>
              <select v-model="pagination.pageSize" name="itemsCount">
                <option value="10" selected>
                  10
                </option>
              </select>
            </div>
            目前第:
            <div>
              <select name="chosenPage">
                <option v-for="page in pagination.page" :key="page" :value="page">
                  {{ page }}
                </option>
              </select>
            </div>
            頁
          </div>
        </div> -->

        <div class="table-box">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">編號</th>
                <th scope="col">員工帳號</th>
                <th scope="col">姓名</th>
                <th scope="col">電話</th>
                <th scope="col">群組</th>
                <th scope="col">主錢包餘額</th>
                <th scope="col">註冊日期</th>
                <th scope="col">最近登入IP</th>
                <th scope="col">備註</th>
                <th scope="col">功能</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="member in members"
                :key="member.id"
              >
                <th scope="row">
                  {{ member.id }}
                </th>
                <td>
                  {{ member.username }}
                </td>
                <td>
                  {{ member.nickname }}
                </td>
                <td>
                  {{ member.phone }}
                </td>
                <td>
                  <div v-if="member.group">
                    {{ member.group.name }}
                  </div>
                  <div v-else>
                    無
                  </div>
                </td>
                <td>
                  {{ member.main_point }}
                </td>
                <td>
                  <div v-if="member.createdAt">
                    <div>
                      {{ formatDate(member.createdAt) }}
                    </div>
                    <div>
                      {{ formatTime(member.createdAt) }}
                    </div>
                  </div>
                </td>
                <td>
                  {{ member?.login_logs?.[0]?.ip }}
                </td>
                <td>
                  {{ member.note }}
                </td>
                <td class="flex gap-2">
                  <router-link
                    :to="{ name: 'AdminMember', params: { memberId: member.id } }"
                    class="btn btn-primary"
                  >
                    修改
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script setup>
import Layout from '../../components/admin/Layout.vue'
import Modal from '../../components/admin/Modal.vue'
import CreateMemberForm from '../../components/admin/form/CreateMemberForm.vue'
import { ref, reactive } from 'vue'
import getFilterQuery from '@utils/getFilterQuery'
import fetchWithToken, { fetchWithoutToken } from '@utils/fetchFn'
import { formatDate, formatTime } from '@utils/formatDateTime'
import qs from 'qs'
import { useToast } from 'vue-toast-notification'
const $toast = useToast()

const members = ref([])
const groupOptions = ref([])
const createMemberModal = ref(null)
const pagination = reactive({
  page: 1,
  pageSize: 10,
  allCount: 0
})
const filterDetail = reactive({
  info: '',
  group: 0,
  isActive: '',
})

onMounted(async () => {
  const { data } = await fetchWithToken('/api/groups?fields[0]=name&fields[1]=isDefault')
  groupOptions.value = data.map((group) => ({
    id: group.id,
    name: group.attributes.name
  }))
})

const route = useRoute()

const queryString = qs.stringify({
  fields: ['username', 'nickname', 'phone', 'main_point', 'createdAt', 'note'],
  populate: {
    group: {
      fields: ['name']
    },
    login_logs: {
      sort: {
        createdAt: 'desc'
      },
      limit: 1,
      fields: ['ip']
    },
  },
  sort: {
    createdAt: 'desc'
  },
  filters: {
    isAdmin: false
  }
  // start: 2,
  // limit: 2
})

const fetchMembers = async (query) => {
  const { filterQuery, countFilterQuery } = getFilterQuery(query)
  pagination.allCount = await fetchWithToken(`/api/users/count?${countFilterQuery}`)
  members.value = await fetchWithToken(`/api/users?${queryString}${filterQuery}`)
}

fetchMembers(route.query)

const createMember = async (formDetail) => {
  const { username, password, nickname, phone, group, lineId: line_id, note } = formDetail
  const postBody = {
    username,
    password,
    nickname,
    phone,
    group,
    line_id,
    note,
  }

  const data = await fetchWithoutToken('/api/auth/local/register', 'POST', postBody)
  if (data.error && data.error.message === 'Email or Username are already taken') {
    $toast.error('員工帳號已重複', {
      class: 'toast-default'
    })
    return
  }
  if (data.error && data.error.message === 'This attribute must be unique') {
    $toast.error('員工姓名已重複', {
      class: 'toast-default'
    })
    return
  }

  const { id, createdAt, main_point } = data.user

  const selectedGroup = groupOptions.value.find((option) => option.id === group)

  members.value.push({
    username,
    nickname,
    phone,
    group: selectedGroup,
    main_point,
    id,
    createdAt,
    note,
  })

  createMemberModal.value.modalClose()
  $toast.success('新增帳號成功', {
    class: 'toast-default'
  })
}

const filterMembers = () => {
  fetchMembers(filterDetail)
}
</script>