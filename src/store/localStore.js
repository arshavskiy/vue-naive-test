import { defineStore } from 'pinia'

export const useLocalStore = defineStore('local', {
  // Initial state
  state: () => ({
    loading: false,
    error: null,
    user: {
      userName: '',
      notifications: 0,
    },
  }),

  getters: {
    getCountryFromLocal() {
      return localStorage?.getItem('countriesLocal') || ''
    },
  },

  // Actions
  actions: {
    stCountryToLocal(countries) {
      return localStorage?.setItem('countriesLocal', countries) || ''
    },
  },
})
