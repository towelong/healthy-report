<script setup lang="ts">
import { useUploadInformation } from '~/logic'
import { useUserStore } from '~/store'
const { schoolId, studentId, address, execute, data } = useUploadInformation()
const user = useUserStore()
const router = useRouter()
function getSchoolId(value: string) {
  schoolId.value = value
}
async function submit() {
  await execute()
  if (data.value.code > 0) {
    user.$reset()
    router.push('/login')
  }
}
</script>

<template>
  <WithAuth>
    <div flex flex-col items-center justify-center gap-4 my-4 m-auto>
      <input v-model="studentId" type="text" placeholder="请输入学号" class="ipt">
      <input v-model="address" type="text" placeholder="请输入签到地址" class="ipt">
      <p text-sm>
        * 请输入完整的地址否则将导致定位失败
      </p>
      <p text-sm>
        如: 江西省赣州市章贡区文明大道99号
      </p>
      <Select value="" tips="请选择所在学校" @school="getSchoolId" />
      <div>
        <button class="btn" @click="submit">
          提交
        </button>
      </div>
    </div>
  </WithAuth>
</template>
