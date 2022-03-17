<script setup lang="ts">
import { useUploadInformation, useUserInformation } from '~/logic'
import { useUserStore } from '~/store'

const { schoolId, studentId, address, execute, statusCode } = useUploadInformation()
const { data } = useUserInformation()

watch(data, (dataVal) => {
  if (dataVal) {
    schoolId.value = dataVal.school_id ? dataVal.school_id : ''
    studentId.value = dataVal.student_id
    address.value = dataVal.address
  }
})

const user = useUserStore()
const router = useRouter()

async function submit() {
  await execute()
  if ((statusCode.value as number) !== 200) {
    localStorage.removeItem('user-info')
    user.$reset()
    router.push('/login')
  }
}
</script>

<template>
  <WithAuth>
    <Loading v-if="!data" />
    <div v-else flex flex-col items-center justify-center gap-4 my-4 m-auto>
      <select v-model="schoolId" text-sm outline-none border="~ gray-200" dark:border=" dark-200" shadow px-2 py-2 w-60 bg-transparent>
        <option value="">
          请选择学校
        </option>
        <option value="4136013436">
          江西农业大学南昌商学院
        </option>
      </select>
      <input v-model="studentId" type="text" placeholder="请输入学号" class="ipt">
      <input v-model="address" type="text" placeholder="请输入签到地址" class="ipt">
      <p text-sm>
        <span text-red-500>*</span> 请输入完整的地址否则将导致定位失败
      </p>
      <p text-sm>
        如: 江西省赣州市章贡区文明大道99号
      </p>
      <div>
        <button class="btn" @click="submit">
          提交
        </button>
      </div>
    </div>
  </WithAuth>
</template>
