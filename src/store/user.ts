import { defineStore } from 'pinia'

// interface User {
//   username: string
//   token: string
// }
const USER_STORE = 'user-info'

export const useUserStore = defineStore('user', {
  state: () => {
    const user = ref(
      useLocalStorage(USER_STORE, {
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
    removeUser() {
      localStorage.removeItem(USER_STORE)
      this.$reset()
    },
  },
})
