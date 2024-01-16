//  localStorage 封装
export default {
  setStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  getStorage(key: string) {
    const value = localStorage.getItem(key)
    if (!value) return ''
    try {
      return JSON.parse(value)
    } catch (error) {
      return value
    }
  },
  delStorage(key: string) {
    localStorage.removeItem(key)
  },
  clearStorage() {
    localStorage.clear()
  }
}
