<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useEditUserInformation, useUploadInformation, useUserInformation } from '~/logic'
import { useUserStore } from '~/store'
useHead({
  title: '健康打卡 - 工具箱',
  meta: [
    {
      name: 'description',
      content: '一个工具箱',
    },
  ],
})
const { data } = useUserInformation()
const { schoolId, studentId, address, execute, statusCode, uploadData, error } = useUploadInformation()
const { payload, httpCode, change } = useEditUserInformation(studentId, schoolId, address)

// 是否可编辑
const editState = ref(false)
const submitState = ref(false)
const changeState = ref(false)
const subChangeState = ref(false)
const toggleSubmitState = useToggle(submitState)
const toggleEditState = useToggle(editState)
const toggleSubChangeState = useToggle(subChangeState)
watch(data, (dataVal) => {
  if (dataVal) {
    schoolId.value = dataVal.school_id ? dataVal.school_id : ''
    studentId.value = dataVal.student_id
    address.value = dataVal.address
    toggleSubmitState()
    // 不存在任务
    if (dataVal.code === 404) {
      editState.value = true
      submitState.value = true
    }
    else {
      changeState.value = true
      submitState.value = false
    }
  }
})

const user = useUserStore()
const router = useRouter()

async function submit() {
  await execute()
  if ((statusCode.value as number) !== 200) {
    user.removeUser()
    router.push('/login')
  }
  editState.value = false
  changeState.value = true
  submitState.value = false
}

function subChange() {
  toggleEditState()
  toggleSubChangeState()
}

</script>

<template>
  <WithAuth>
    <Loading v-if="!data" />
    <div v-else flex flex-col items-center justify-center gap-4 my-4 m-auto>
      <select v-model="schoolId" :disabled="!editState" text-sm outline-none border="~ gray-200" dark:border=" dark-200" shadow px-2 py-2 w-60 bg-transparent>
        <option value="">
          请选择学校
        </option>
        <option value="4136013436">
          江西农业大学南昌商学院
        </option>
      </select>
      <input v-model="studentId" :disabled="!editState" type="text" placeholder="请输入学号" class="ipt">
      <input v-model="address" :disabled="!editState" type="text" placeholder="请输入签到地址" class="ipt">
      <p text-sm>
        <span text-red-500>*</span> 请输入完整的地址否则将导致定位失败
      </p>
      <p text-sm>
        如: 江西省赣州市章贡区文明大道99号
      </p>
      <p text-sm>
        <span text-red-500>*</span> 每日7点自动打卡
      </p>
      <!-- 上传成功提示信息 -->
      <template v-if="statusCode == 200 && uploadData">
        <p text-sm text-teal-700>
          {{ uploadData.msg }}
        </p>
      </template>
      <template v-if="error">
        <p text-sm text-red-400>
          {{ data.code > 0 ? data.msg : "" }}
        </p>
      </template>
      <!-- 修改成功提示信息 -->
      <template v-if="httpCode == 200 && payload">
        <p text-sm text-teal-700>
          {{ payload.msg }}
        </p>
      </template>
      <div flex text-sm gap-2>
        <button v-if="submitState" class="btn" @click="submit">
          提交
        </button>
        <!-- 编辑状态下的按钮 -->

        <template v-if="changeState">
          <button btn :disabled="subChangeState" @click="subChange">
            修改
          </button>
          <button v-if="subChangeState" btn @click="change()">
            提交1
          </button>
        </template>
      </div>
    </div>
  </WithAuth>
</template>
