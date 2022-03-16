<script setup lang="ts">
import { useUserStore } from '~/store'

const account = ref('')
const pwd = ref('')
const user = useUserStore()

const { post, data, execute } = useFetch('http://localhost:8016/login',
  { immediate: false }).json()

watchEffect(() => {
  post({ username: account.value, password: pwd.value })
})

async function login() {
  await execute()
  if (data.value.token)
    user.createUser(account.value, data.value.token)
}

</script>

<template>
  <div flex flex-col items-center justify-center gap-4 mt-16 m-auto>
    <input v-model="account" type="text" placeholder="请输入用户名" class="ipt">
    <input v-model="pwd" type="password" placeholder="请输入密码" class="ipt">
    <template v-if="data">
      <p>{{ data.code > 0 ? data.msg : "" }}</p>
    </template>
    <button class="btn" @click="login">
      登录
    </button>
  </div>
</template>
