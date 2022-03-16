import { createFetch } from '@vueuse/core'
import { useUserStore } from '~/store'

const url = 'http://localhost:8016'

export const useAuthFetch = createFetch({
  baseUrl: url,
  options: {
    async beforeFetch({ options }) {
      const user = await useUserStore()
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${user.token}`,
      }
      return { options }
    },
  },
})

export const useNormalFetch = createFetch({
  baseUrl: url,
})
