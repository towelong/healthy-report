<script setup lang="ts">
import { useUserStore } from '~/store'
const user = useUserStore()
const router = useRouter()
if (user.token && user.username)
  router.push('/')

</script>

<template>
  <div>
    <slot />
  </div>
</template>
