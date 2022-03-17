<script setup lang="ts">
import { useEditUserInformation, useUploadInformation, useUserInformation } from '~/logic'
import { useUserStore } from '~/store'

const { schoolId, studentId, address, execute, statusCode, uploadData } = useUploadInformation()
const { data } = useUserInformation()
const { payload, httpCode, change } = useEditUserInformation(studentId, schoolId, address)
// 输入框编辑状态
const isEdit = ref(false)
// 信息上传按钮的状态
const isClick = ref(false)
const toggleEdit = useToggle(isEdit)
// const toggleClick = useToggle(isClick)

watch(data, (dataVal) => {
  if (dataVal) {
    schoolId.value = dataVal.school_id ? dataVal.school_id : ''
    studentId.value = dataVal.student_id
    address.value = dataVal.address
    // 不存在任务
    if (dataVal.code === 404) {
      isEdit.value = true
      isClick.value = true
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
  isClick.value = false
}

async function edit() {
  await change()
  isEdit.value = false
}

</script>

<template>
  <WithAuth>
    <Loading v-if="!data" />
    <div v-else flex flex-col items-center justify-center gap-4 my-4 m-auto>
      <select v-model="schoolId" :disabled="!isEdit" text-sm outline-none border="~ gray-200" dark:border=" dark-200" shadow px-2 py-2 w-60 bg-transparent>
        <option value="">
          请选择学校
        </option>
        <option value="4136013436">
          江西农业大学南昌商学院
        </option>
      </select>
      <input v-model="studentId" :disabled="!isEdit" type="text" placeholder="请输入学号" class="ipt">
      <input v-model="address" :disabled="!isEdit" type="text" placeholder="请输入签到地址" class="ipt">
      <p text-sm>
        <span text-red-500>*</span> 请输入完整的地址否则将导致定位失败
      </p>
      <p text-sm>
        如: 江西省赣州市章贡区文明大道99号
      </p>
      <!-- 上传成功提示信息 -->
      <template v-if="statusCode == 200 && uploadData">
        <p text-sm text-teal-700>
          {{ uploadData.msg }}
        </p>
      </template>
      <!-- 修改成功提示信息 -->
      <template v-if="httpCode == 200 && payload">
        <p text-sm text-teal-700>
          {{ payload.msg }}
        </p>
      </template>
      <div flex text-sm gap-2>
        <button v-if="isClick" class="btn" @click="submit">
          提交
        </button>
        <!-- 编辑状态下的按钮 -->
        <button v-if="!isClick" class="btn" :disabled="isEdit" @click="toggleEdit()">
          修改
        </button>
        <button v-if="isEdit && !isClick" class="btn" @click="edit">
          提交1
        </button>
      </div>
    </div>
  </WithAuth>
</template>
