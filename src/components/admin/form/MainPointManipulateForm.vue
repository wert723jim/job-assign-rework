<template>
  <div>
    <form @submit.prevent.stop="manipulateMainPoint">
      <div class="form-group">
        <label for="member">員工</label>
        <input class="form-control" type="text" id="member" :value="chosenMember.member" disabled>
      </div>
      <div class="form-group">
        <label for="memberIsActive">狀態</label>
        <div>
          <span v-if="chosenMember.isActive" class="badge-pill badge-success py-1 rounded-lg">啟用</span>
          <span v-else class="badge-pill badge-danger py-1 rounded-lg">停用</span>
        </div>
      </div>
      <div class="form-group">
        <label for="memberMainPoint">餘額</label>
        <div>
          <span>{{chosenMember.main_point}}</span>
        </div>
      </div>
      <div class="form-group">
        <label for="editPoint">補點額度</label>
        <input class="form-control" type="number" id="editPoint" v-model="formDetail.edit_point">
        <small>(加:+ 扣:-)</small>
      </div>
      <div class="form-group">
        <label for="reason">事由</label>
        <textarea class="form-control" name="reason" id="reason" v-model="formDetail.cause"></textarea>
      </div>
      <div class="form-group text-end">
        <button class="btn btn-primary" type="submit">提交</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
defineProps({
  chosenMember: {
    type:Object
  }
})
const emit = defineEmits(['manipulateMainPoint'],)

const formDetail = reactive({
  edit_point: 0,
  cause: '',
})

const manipulateMainPoint = () => {
  emit('manipulateMainPoint', {...formDetail})
}
</script>