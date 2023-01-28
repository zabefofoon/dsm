import {apiClient} from "~/api/config"
import {AuthType} from "~/../server/model/AuthType"

export default {
  signIn: (authData: AuthType) =>
      apiClient.post('/api/auth/signIn', authData),

  signUp: (authData: AuthType) =>
      apiClient.post('/api/auth/signUp', authData),

  signOut: () => apiClient.get('/api/auth/signOut'),
}