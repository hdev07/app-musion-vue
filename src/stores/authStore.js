import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import router from '../router'

const $axios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true
})

export const useUserStore = defineStore('user', () => {
  const token = ref(null)
  const expiresIn = ref(null)

  const access = async (body) => {
    try {
      const { data } = await $axios.post('/auth/login', body)
      token.value = data.token
      expiresIn.value = data.expiresIn
      localStorage.setItem('user', true)
      router.push('/news')
      setTime()
    } catch (error) {
      console.error(error)
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
      console.error(error)
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
    } catch (error) {
      console.error(error)
    } finally {
      token.value = null
      expiresIn.value = null
      localStorage.removeItem('user')
    }
  }

  return {
    token,
    expiresIn,
    access,
    refreshToken,
    logout
  }
})
