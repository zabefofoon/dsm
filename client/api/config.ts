import axios from "axios"
import {config} from "~/config/config"

export const apiClient = axios.create({
  baseURL: config.apiUrl,
  headers: {
    "Content-Type": "application/json",
    'X-Requested-With': 'XMLHttpRequest'
  }
})