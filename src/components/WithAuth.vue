<script setup lang="ts">
import { useUserStore } from '~/store'
const user = useUserStore()
const router = useRouter()
const token = computed(() => user.token)
const username = computed(() => user.username)
watchEffect(() => {
  if (!token.value || !username.value)
    router.push('/login')
})

</script>

<template>
  <div>
    <slot />
  </div>
</template>
