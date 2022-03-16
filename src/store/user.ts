import { defineStore } from 'pinia'

// interface User {
//   username: string
//   token: string
// }

export const useUserStore = defineStore('user', {
  state: () => {
    const user = ref(
      useLocalStorage('user-info', {
        username: '',
        token: '',
      }),
    )
    return {
      user,
    }
  },
  getters: {
    username: state => state.user.username,
    token: state => state.user.token,
  },
  actions: {
    createUser(username: string, token: string) {
      this.user.username = username
      this.user.token = token
    },
  },
})
