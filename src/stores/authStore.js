import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const $axios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true
})

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const expiresIn = ref('')

  const access = async (body) => {
    try {
      const { data } = await $axios.post('/auth/login', body)
      token.value = data.token
      expiresIn.value = data.expiresIn
      setTime()
    } catch (error) {
      console.error(error)
    }
  }

  const refresToken = async () => {
    try {
      const { data } = await $axios.get('/auth/refresh')
      token.value = data.token
      expiresIn.value = data.expiresIn
      setTime()
    } catch (error) {
      console.error(error)
    }
  }

  const setTime = () => {
    setTimeout(() => {
      refresToken()
    }, expiresIn.value * 1000 - 6000)
  }

  const logout = async () => {
    try {
      await $axios.get('/auth/logout')
      token.value = null
      expiresIn.value = null
    } catch (error) {
      console.error(error)
    }
  }

  return {
    token,
    expiresIn,
    access,
    refresToken,
    logout
  }
})
