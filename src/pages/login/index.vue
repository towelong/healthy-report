<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useLogin } from '~/logic'
import { useUserStore } from '~/store'
useHead({
  title: '登录 - 工具箱',
  meta: [
    {
      name: 'description',
      content: '一个工具箱',
    },
  ],
})
const user = useUserStore()
const router = useRouter()
const { execute, data, account, pwd, error } = useLogin()

function goto(path: string) {
  router.push(path)
}

watchEffect(() => {
  if (user.token)
    goto('/')
})

async function login() {
  await execute()
  if (data.value.token) {
    user.createUser(account.value, data.value.token)
    goto('/')
  }
}

</script>

<template>
  <div flex flex-col items-center justify-center gap-4 mt-16 m-auto>
    <input v-model="account" type="text" placeholder="请输入用户名" class="ipt">
    <input v-model="pwd" type="password" placeholder="请输入密码" class="ipt">
    <template v-if="error">
      <p text-sm text-red-400>
        {{ data.code > 0 ? data.msg : "" }}
      </p>
    </template>
    <button class="btn" @click="login">
      登录
    </button>
    <p text-sm cursor-pointer hover:text-teal-700 hover:underline="~ offset-2" @click="goto('/register')">
      没有账号?去注册
    </p>
  </div>
</template>
