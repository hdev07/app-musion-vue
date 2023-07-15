import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import router from '../router'

const $axios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_BACK_END,
  withCredentials: true
})

export const useAuthStore = defineStore('auth', () => {
  const token = ref(null)
  const expiresIn = ref(null)
  const message = ref(null)
  const status = ref(null)

  const login = async (body) => {
    try {
      const { data } = await $axios.post('/auth/login', body)
      token.value = data.token
      expiresIn.value = data.expiresIn
      localStorage.setItem('user', true)
      router.push({ name: 'home' })
      setTime()
    } catch (error) {
      console.error('error :>> ', error)
    }
  }

  const register = async (body) => {
    try {
      const { data } = await $axios.post('/auth/register', body)
      token.value = data.token
      expiresIn.value = data.expiresIn
      localStorage.setItem('user', true)
      router.push({ name: 'home' })
      setTime()
    } catch (error) {
      console.error('error :>> ', error)
    }
  }

  const refreshToken = async () => {
    try {
      const { data } = await $axios.get('/auth/refresh')
      token.value = data.token
      expiresIn.value = data.expiresIn
      localStorage.setItem('user', true)
      setTime()
    } catch (error) {
      console.error('error :>> ', error)

      localStorage.removeItem('user')
    }
  }

  const setTime = () => {
    setTimeout(() => {
      refreshToken()
    }, expiresIn.value * 1000 - 6000)
  }

  const logout = async () => {
    try {
      await $axios.get('/auth/logout')
      router.push({ name: 'signin' })
    } catch (error) {
      console.error('error :>> ', error)
    } finally {
      token.value = null
      expiresIn.value = null
      localStorage.removeItem('user')
    }
  }

  const requestResetPassword = async (body) => {
    try {
      const data = await $axios.post('/auth/reset-password/request', body)
      message.value = data.data.msg
      status.value = data.status
    } catch (error) {
      message.value = error.response.data.msg
      status.value = error.response.status
    }
  }

  const resetPassword = async (body) => {
    try {
      const data = await $axios.post('/auth/reset-password', body)
      message.value = data.data.msg
      status.value = data.status
      setTimeout(() => {
        router.push({ name: 'signin' })
      }, 4000)
    } catch (error) {
      message.value = error.response.data.msg
      status.value = error.response.status
    }
  }

  return {
    token,
    expiresIn,
    message,
    status,
    login,
    register,
    refreshToken,
    logout,
    requestResetPassword,
    resetPassword
  }
})
