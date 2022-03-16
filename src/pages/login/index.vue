<script setup lang="ts">
import { useLogin } from '~/logic'
import { useUserStore } from '~/store'

const user = useUserStore()
const router = useRouter()
const { execute, data, account, pwd, error } = useLogin()

async function login() {
  await execute()
  if (data.value.token) {
    user.createUser(account.value, data.value.token)
    router.push('/')
  }
}

</script>

<template>
  <WithAuth>
    <div flex flex-col items-center justify-center gap-4 mt-16 m-auto>
      <input v-model="account" type="text" placeholder="请输入用户名" class="ipt">
      <input v-model="pwd" type="password" placeholder="请输入密码" class="ipt">
      <template v-if="error">
        {{ data.code > 0 ? data.msg : "" }}
      </template>
      <button class="btn" @click="login">
        登录
      </button>
    </div>
  </WithAuth>
</template>
