import { useAuthFetch, useNormalFetch } from '~/request'

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

export function useUploadInformation() {
  const studentId = ref<string>('')
  const address = ref<string>('')
  const schoolId = ref<string>('')
  const { post, data, execute, error } = useAuthFetch('/information',
    { immediate: false }).json()

  watchEffect(() => {
    post({ student_id: studentId.value, school_id: schoolId.value, address: address.value })
  })
  return {
    data,
    execute,
    schoolId,
    studentId,
    address,
    error,
  }
}
