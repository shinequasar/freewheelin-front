import axios from 'axios'

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
})

apiInstance.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.log('= API Request:', config.method?.toUpperCase(), config.url)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

apiInstance.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log('= API Response:', response.status, response.config.url)
    }
    return response
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          console.error('잘못된 요청입니다.')
          break
        case 404:
          console.error('요청한 리소스를 찾을 수 없습니다.')
          break
        case 500:
          console.error('서버 오류가 발생했습니다.')
          break
        default:
          console.error('API 에러:', error.response.data)
      }
    } else if (error.request) {
      console.error('네트워크 오류가 발생했습니다.')
    } else {
      console.error('요청 설정 오류:', error.message)
    }
    return Promise.reject(error)
  },
)

export default apiInstance
