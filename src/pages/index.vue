<script setup lang="ts">
import { useHead } from '@vueuse/head'
const router = useRouter()
const go = () => {
  router.push('/healthy')
}
useHead({
  title: '工具箱',
  meta: [
    {
      name: 'description',
      content: '一个工具箱',
    },
  ],
})
</script>

<template>
  <div class="max-w-[60ch] m-auto px-7">
    <div class="project-grid gap-2  py-2 -mx-3">
      <!-- <template v-for="i in 5" :key="i"> -->
      <a
        class="flex items-center relative item cursor-pointer
          group hover:bg-light-200" dark:hover="bg-dark-200"
        @click="go()"
      >
        <div class="pt-2 pr-5">
          <div text-3xl opacity-50 i-carbon-favorite />
        </div>
        <div flex-auto>
          <div class="font-serif opacity-70 text-lg font-medium group-hover:opacity-100">健康打卡</div>
          <div class="desc text-sm opacity-50 font-normal group-hover:opacity-70">支付宝防疫打卡</div>
        </div>
      </a>
      <!-- </template> -->
    </div>
  </div>
</template>
