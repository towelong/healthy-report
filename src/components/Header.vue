<script setup lang="ts">
import { isDark, toggleDark } from '~/composables'
const router = useRouter()
const go = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div border="b base">
    <div class="flex items-center max-w-[60ch] py-4 px-4 ma">
      <div text-xl>
        <button>
          <div i-carbon-help />
        </button>
      </div>
      <div grow>
        <p font-serif text="center 2xl" cursor-pointer @click="go('/')">
          工具箱
        </p>
      </div>
      <div text-xl flex gap-2>
        <button @click="toggleDark()">
          <div v-if="isDark" i-carbon-moon />
          <div v-else i-carbon-sun />
        </button>
        <button @click="go('/personal')">
          <p i-carbon-user />
        </button>
      </div>
    </div>
  </div>
</template>
