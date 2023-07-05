<script setup>
import CardCommon from '@/components/common/cardCommon.vue'
import PaginationCommon from '@/components/common/paginationCommon.vue'
import SearchCommon from '@/components/common/searchCommon.vue'
import { paramsToString } from '@/helpers/helpers.js'
import { useMuseumsStore } from '@/stores/museumsStore.js'
import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const museumStore = useMuseumsStore()
const router = useRouter()

onMounted(() => {
  if (router.currentRoute.value.name === 'favorites') {
    fetchMuseums()
  }
})

watch(router.currentRoute, () => {
  if (router.currentRoute.value.name === 'favorites') {
    fetchMuseums()
  }
})

const fetchMuseums = async () => {
  try {
    const queryParams = paramsToString(router.currentRoute.value.query)
    await museumStore.getMuseumsFavorites(queryParams)
  } catch (error) {
    console.error(error)
  }
}

const retrieveData = () => {
  fetchMuseums()
}

const handleSearch = (search) => {
  const query = { ...router.currentRoute.value.query, page: 1, search }
  router.push({ query })
}

const handleChangePage = (page) => {
  const query = { ...router.currentRoute.value.query, page }
  router.push({ query })
}

const returnLocationString = (address) => {
  let locationString = `${address?.streetAddress}
    ${address?.addressLocality}
    ${address?.postalCode}
    ${address?.addressCountry}
    ${address?.city}`
  return locationString
}
</script>
<template>
  <v-container>
    <SearchCommon @search="handleSearch" />
    <div v-for="museum in museumStore.museumsFavorites" :key="museum.id">
      <CardCommon
        :id="museum?._id"
        :title="museum?.name"
        :description="museum?.description"
        :location="returnLocationString(museum.address)"
        @update-data="retrieveData"
      />
    </div>
    <PaginationCommon
      v-if="museumStore.totalPage >= 25"
      :perPage="museumStore.perPage"
      :totalPages="museumStore.lastPage"
      :currentPage="museumStore.currentPage"
      @changePage="handleChangePage"
    />
    <div class="my-16" />
  </v-container>
</template>
