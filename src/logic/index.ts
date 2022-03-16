import { useNormalFetch } from '~/request'

export function useLogin() {
  const account = ref('')
  const pwd = ref('')
  const { post, data, execute, error } = useNormalFetch('/login',
    { immediate: false }).json()

  watchEffect(() => {
    post({ username: account.value, password: pwd.value })
  })
  return {
    data,
    execute,
    account,
    pwd,
    error,
  }
}
