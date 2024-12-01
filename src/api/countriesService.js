import axios from 'axios'
import { APP_CONFIGS } from '@/utils/consts.js'

const countries_flags = APP_CONFIGS.COUNTRIES_FLAGS
const base_url = APP_CONFIGS.BASE_URL

export const countriesService = {
  async getAllCountries() {
    try {
      const response = await axios.get(`${base_url}?fields=${countries_flags}`)
      return response.data
    } catch (error) {
      console.error('Error fetching countriesList:', error)
    }
  },
  async getUserData() {
    try {
      return new Promise((resolve) => {
        resolve({
          notifications: '15',
          userName: 'Pavel Arshavsky',
        })
      })
    } catch (error) {
      console.error('Error fetching getUserData:', error.message)
    }
  },
}
