<template>
  <v-container>
    <SearchCommon @search="handleSearch" />
    <div class="flex mx-3 mb-3 gap-2 overflow-x-auto">
      <div
        v-for="(category, i) in museumStore.categories"
        :key="i"
        @click="selectCategory(category.category)"
      >
        <v-chip
          :class="{ primary: selectedCategories.includes(category.category) }"
        >
          {{
            categories[i]?.category ? categories[i]?.category : 'Sin categoría'
          }}
        </v-chip>
      </div>
    </div>
    <div v-for="museum in museumStore.museums" :key="museum.id">
      <CardCommon
        :id="museum?._id"
        :title="museum?.name"
        :description="museum?.description"
        :location="returnLocationString(museum.address)"
        @update-data="retrieveData"
      />
    </div>
    <PaginationCommon
      :perPage="museumStore.perPage"
      :totalPages="museumStore.lastPage"
      :currentPage="museumStore.currentPage"
      @changePage="handleChangePage"
    />
    <div class="relative h-32" />
  </v-container>
</template>

<script setup>
import CardCommon from '@/components/common/cardCommon.vue'
import PaginationCommon from '@/components/common/paginationCommon.vue'
import SearchCommon from '@/components/common/searchCommon.vue'
import { paramsToString } from '@/helpers/helpers.js'
import { useMuseumsStore } from '@/stores/museumsStore.js'

import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const museumStore = useMuseumsStore()
const selectedCategories = ref([])
const router = useRouter()

onMounted(() => {
  getCategories
  fetchMuseums
})

const fetchMuseums = async () => {
  try {
    const queryParams = paramsToString(router.currentRoute.value.query)
    await museumStore.getMuseums(queryParams)
  } catch (error) {
    console.error(error)
  }
}

const getCategories = async () => {
  try {
    await museumStore.getCategories()
  } catch (error) {
    console.error(error)
  }
}

watch(router.currentRoute, () => {
  fetchMuseums()
})

function handleSearch(search) {
  const query = { ...router.currentRoute.value.query, page: 1, search }
  router.push({ query })
}

const handleChangePage = (page) => {
  const query = { ...router.currentRoute.value.query, page }
  router.push({ query })
}

function retrieveData() {
  fetchMuseums()
}

const returnLocationString = (address) => {
  let locationString = `${address?.streetAddress}
    ${address?.addressLocality}
    ${address?.postalCode}
    ${address?.addressCountry}
    ${address?.city}`
  return locationString
}

async function selectCategory(category) {
  const index = selectedCategories.value.indexOf(category)

  if (index > -1) {
    selectedCategories.value.splice(index, 1)
  } else {
    selectedCategories.value.push(category)
  }

  let query = {
    ...router.currentRoute.value.query,
    categories: selectedCategories.value.filter((cat) => cat !== '')
  }

  if (selectedCategories.value.includes('')) {
    query.categories = query.categories.filter((cat) => cat !== '')
    query.categories.push('Sin categoría')
  }

  if (query.categories.length === 0) {
    delete query.categories
  }

  router.push({ query })
  console.log(selectedCategories.value)
}
</script>
