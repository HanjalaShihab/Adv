const fallbackBaseUrl = import.meta.env.PROD ? '' : 'http://localhost:3001'

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || fallbackBaseUrl

export const buildApiUrl = (path) => `${API_BASE_URL}${path}`
