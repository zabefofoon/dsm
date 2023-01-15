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
    async () => await useRouter().push('/sign'))