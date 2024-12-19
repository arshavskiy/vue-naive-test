import { defineStore } from 'pinia'
import { countriesService } from '../api/countriesService.js'

import { useLocalStore } from '@/store/localStore.js'

export const useCountriesStore = defineStore('countries', {
  // Initial state
  state: () => ({
    countries: [],
    loading: false,
    error: null,
    countriesLocal: () => {
      const localStore = useLocalStore()
      return localStore.getCountryFromLocal()
    },
    cities: [],
    countryData: {},
  }),

  getters: {
    hasCountries() {
      return this.countries.length > 0
    },
    getStoreElm(elm) {
      return this[elm]
    },
    getGoogleUrl() {
      return this.countryData
    },
  },

  actions: {
    setGoogleUrl(data) {
      this.countryData = data
    },
    saveToLocalStorage(data) {
      const localStore = useLocalStore()
      localStore.stCountryToLocal(data)
    },
    loadFromLocalStorage() {
      const localStore = useLocalStore()
      this.sharedData = localStore.getCountryFromLocal()
    },
    // Fetch all countriesList
    async fetchCountries() {
      // Reset state before fetching
      this.countries = []
      this.loading = true
      this.error = null

      try {
        const response = await countriesService.getAllCountries()
        this.countries = response.sort((a, b) => a.name.common.localeCompare(b.name.common))
      } catch (error) {
        this.error =
          error.response?.data?.message ||
          error.message ||
          'An unknown error occurred while fetching countriesList'
        console.error('Failed to fetch countriesList:', error)
      } finally {
        this.loading = false
      }
    },
    // Clear current countriesList and reset state
    clearCountries() {
      this.countries = []
      this.loading = false
      this.error = null
    },
  },
})
