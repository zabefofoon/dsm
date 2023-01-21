import axios from "axios"
import {config} from "~/config/config"
import {useRouter} from "#imports"

export const apiClient = axios.create({
  baseURL: config.apiUrl,
  headers: {
    "Content-Type": "application/json",
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true
})

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response.status === 401
          || error.response.status === 403)
        await useRouter().push('/sign')
      await Promise.reject(error)
    })