import { createFetch } from '@vueuse/core'
import { useUserStore } from '~/store'

const url = 'http://localhost:8016'
const user = useUserStore()

export const useAuthFetch = createFetch({
  baseUrl: url,
  options: {
    beforeFetch({ options }) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${user.token}`,
      }
      return { options }
    },
    afterFetch(ctx) {
      if (ctx.response.status === 401)
        user.$reset()
      return ctx
    },
  },
})

export const useNormalFetch = createFetch({
  baseUrl: url,
})
