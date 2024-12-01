import { defineStore } from 'pinia'
import { userService } from '../api/userService.js'

export const useUsersStore = defineStore('users', {
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
    getUser() {
      return this.user.userName
        .split(' ')
        .map((item) => item[0])
        .join('')
    },
  },

  // Actions
  actions: {
    async fetchUserData() {
      try {
        this.user = await userService.getUserData()
      } catch (error) {
        this.error =
          error.response?.data?.message ||
          error.message ||
          'An unknown error occurred while fetching countriesList'
        console.error('Failed to fetch countriesList:', error)
      }
    },
  },
})
