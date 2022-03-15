<script setup lang="ts">
const schoolName = ref('江西农业大学')
</script>

<template>
  <div flex flex-col items-center justify-center gap-4 my-4 m-auto>
    <div font-serif>
      欢迎👏🏻，鹏宇
    </div>
    <input type="text" placeholder="请输入学号" class="ipt">
    <input type="password" placeholder="请输入签到地址" class="ipt">
    <button class="btn">
      登录
    </button>
    <Select :value="schoolName" />
  </div>
</template>
