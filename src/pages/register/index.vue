<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useRegister } from '~/logic'

useHead({
  title: '注册 - 工具箱',
  meta: [
    {
      name: 'description',
      content: '一个工具箱',
    },
  ],
})
const { execute, data, statusCode, account, pwd, error } = useRegister()
const router = useRouter()
async function register() {
  await execute()
  if (statusCode.value === 200) {
    account.value = ''
    pwd.value = ''
    setTimeout(() => {
      router.push('/login')
    }, 500)
  }
}

</script>

<template>
  <div flex flex-col items-center justify-center gap-4 mt-16 m-auto>
    <input v-model="account" type="text" placeholder="请输入用户名" class="ipt">
    <input v-model="pwd" type="password" placeholder="请输入密码" class="ipt">
    <template v-if="error">
      <p text-red-400>
        {{ data.code > 0 ? data.msg : "" }}
      </p>
    </template>
    <template v-if="statusCode == 200">
      <p text-teal-700 text-sm>
        注册成功
      </p>
    </template>
    <button class="btn" @click="register">
      注册
    </button>
  </div>
</template>
