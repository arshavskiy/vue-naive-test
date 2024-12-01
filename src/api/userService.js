export const userService = {
  async getUserData() {
    try {
      return new Promise((resolve) => {
        resolve({
          notifications: '16',
          userName: 'Pavel Arshavsky',
        })
      })
    } catch (error) {
      console.error('Error fetching getUserData:', error.message)
    }
  },
}
