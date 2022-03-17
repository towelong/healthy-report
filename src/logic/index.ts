import type { Ref } from 'vue'
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
// useRegister
export function useRegister() {
  const account = ref('')
  const pwd = ref('')
  const { post, data, statusCode, execute, error } = useNormalFetch('/register',
    { immediate: false }).json()

  watchEffect(() => {
    post({ username: account.value, password: pwd.value })
  })
  return {
    data,
    statusCode,
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
  const { post, statusCode, execute, error, data } = useAuthFetch('/information',
    { immediate: false }).json()

  watchEffect(() => {
    post({ student_id: studentId.value, school_id: schoolId.value, address: address.value })
  })
  return {
    statusCode,
    execute,
    schoolId,
    studentId,
    address,
    error,
    uploadData: data,
  }
}

export function useEditUserInformation(studentId: Ref<string>, schoolId: Ref<string>, address: Ref<string>) {
  const { put, data, statusCode, execute, error } = useAuthFetch('/information',
    { immediate: false }).json()

  watchEffect(() => {
    put({ student_id: studentId.value, school_id: schoolId.value, address: address.value })
  })

  return {
    payload: data,
    change: execute,
    httpCode: statusCode,
    editError: error,
  }
}

export function useUserInformation() {
  const { data, error } = useAuthFetch('/information').get().json()
  return {
    data,
    error,
  }
}
