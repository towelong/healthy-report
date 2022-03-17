<script setup lang="ts">
import { useUserStore } from '~/store'

const router = useRouter()
const user = useUserStore()
const username = computed(() => user.username)

const logout = () => {
  user.removeUser()
  router.push('/')
}
</script>

<template>
  <WithAuth>
    <div flex flex-col items-center justify-center gap-4 my-4 m-auto>
      <div font-serif>
        欢迎👏🏻，{{ username }}
      </div>
      <div
        flex justify-center items-center cursor-pointer px-2 py-1 border="~ light-200" dark="border-dark-200" shadow text-sm hover:bg-light-300 dark:hover="bg-dark-50"
        @click="logout"
      >
        <div i-carbon-logout />
        <div>退出</div>
      </div>
    </div>
  </WithAuth>
</template>
