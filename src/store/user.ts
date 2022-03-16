import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: useStorage('user-info', {
      username: '',
      token: '',
    }),
  }),
  getters: {
    username: state => state.userInfo.username,
    token: state => state.userInfo.token,
  },
  actions: {
    createUser(username: string, token: string) {
      this.userInfo.username = username
      this.userInfo.token = token
    },
  },
})
