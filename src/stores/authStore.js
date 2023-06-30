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

  const login = async (body) => {
    try {
      const { data } = await $axios.post('/auth/login', body)
      token.value = data.token
      expiresIn.value = data.expiresIn
      localStorage.setItem('user', true)
      router.push({ name: 'home' })
      setTime()
    } catch (error) {
      if (error.response) {
        throw error.response.data
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log('Error', error.message)
      }
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
      if (error.response) {
        throw error.response.data
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log('Error', error.message)
      }
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
      if (error.response) {
        throw error.response.data
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log('Error', error.message)
      }
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
      if (error.response) {
        throw error.response.data
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log('Error', error.message)
      }
    } finally {
      token.value = null
      expiresIn.value = null
      localStorage.removeItem('user')
    }
  }

  return {
    token,
    expiresIn,
    login,
    register,
    refreshToken,
    logout
  }
})
