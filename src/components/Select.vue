<script setup lang="ts">
interface Data {
  id: string
  name: string
}
const props = withDefaults(defineProps<{
  value?: string
  list: () => Data[]
}>(), {
  value: '江西农业大学南昌商学院',
  list: () => [
    {
      id: '1',
      name: '江西农业大学南昌商学院',
    },
    {
      id: '2',
      name: '江西农业大学南昌商学院',
    },
    {
      id: '3',
      name: '江西农业大学南昌商学院',
    },
    {
      id: '4',
      name: '江西农业大学南昌商学院',
    },
    {
      id: '5',
      name: '江西农业大学南昌商学院',
    },
  ],
})

const isShow = ref(false)
const show = () => {
  isShow.value = !isShow.value
}

</script>

<template>
  <div class="flex-auto flex flex-col items-center">
    <div class="flex flex-col items-center relative">
      <div class="w-full">
        <div class="w-60 my-2 bg-white shadow flex border border-gray-200 rounded">
          <div class="flex flex-auto flex-wrap" />
          <input :value="props.value" disabled class="p-2 appearance-none outline-none w-full text-sm">
          <div>
            <button class="cursor-pointer w-6 h-full flex items-center text-gray-400 outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x w-4 h-4">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div class="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200 svelte-1l8159u" @click="show">
            <button class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-up w-4 h-4">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        class="absolute shadow top-14 w-full left-0 rounded "
      >
        <div
          class="flex flex-col w-full overflow-auto overflow-y-overlay max-h-40 transition-all duration-300"
          :style="isShow ? {height: '180px'} : {height: '0px'}"
        >
          <template v-for="i in props.list()" :key="i.id">
            <div class="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100" @click="show">
              <div class="flex w-full items-center p-2 pl-2 border-transparent bg-white border-l-2 relative hover:bg-teal-600 hover:text-teal-100 hover:border-teal-600">
                <div class="w-full items-center flex">
                  <div class="mx-2 leading-6  ">
                    {{ i.name }}
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
