import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from './authStore.js'

const $axios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_BACK_END,
  withCredentials: true
})

export const useUserStore = defineStore('user', () => {
  const authStore = useAuthStore()
  const user = ref({})

  const getUser = async () => {
    try {
      const { data } = await $axios({
        method: 'GET',
        url: `/users`,
        headers: {
          Authorization: 'Bearer ' + authStore.token
        }
      })
      user.value = data
    } catch (error) {
      console.log(error)
    }
  }
  return {
    user,
    getUser
  }
})
