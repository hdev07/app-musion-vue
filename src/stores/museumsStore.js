import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import router from '../router'
import { useUserStore } from './authStore.js'

const $axios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_BACK_END,
  withCredentials: true
})

export const useMuseumsStore = defineStore('museum', () => {
  const userStore = useUserStore()
  const museums = ref([])
  const museum = ref({})
  const perPage = ref()
  const currentPage = ref()
  const lastPage = ref()
  const totalPage = ref()
  const categories = ref([])

  const getMuseums = async (queryParams) => {
    try {
      const { data } = await $axios({
        method: 'GET',
        url: `/museums?${queryParams}`,
        headers: {
          Authorization: 'Bearer ' + userStore.token
        }
      })
      currentPage.value = data.currentPage
      lastPage.value = data.lastPage
      museums.value = data.museums
      perPage.value = data.perPage
      totalPage.value = data.total
    } catch (error) {
      console.error('error :>> ', error)
    }
  }

  const getMuseum = async (id) => {
    const { data } = await $axios.get(`/museums/${id}`)
    museum.value = data
  }

  const updateMuseum = async (museum) => {
    const { data } = await $axios.put(`/museums/${museum.id}`, museum)
    router.push('/museums')
    console.log(data)
  }

  const deleteMuseum = async (id) => {
    const { data } = await $axios.delete(`/museums/${id}`)
    router.push('/museums')
    console.log(data)
  }

  const getCategories = async () => {
    try {
      const { data } = await $axios({
        method: 'GET',
        url: `/museums/categories`,
        headers: {
          Authorization: 'Bearer ' + userStore.token
        }
      })
      categories.value = data.categories
    } catch (error) {
      console.error('error :>> ', error)
    }
  }

  return {
    museums,
    museum,
    lastPage,
    perPage,
    currentPage,
    totalPage,
    categories,
    getMuseums,
    getMuseum,
    updateMuseum,
    deleteMuseum,
    getCategories
  }
})
