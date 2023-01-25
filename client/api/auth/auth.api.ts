import {apiClient} from "~/api/config"
import {AuthType} from "~/../server/model/AuthType"

export default {
  signIn: (authData: AuthType) =>
      apiClient.post('/auth/signIn', authData),

  signUp: (authData: AuthType) =>
      apiClient.post('/auth/signUp', authData),

  signOut: () => apiClient.get('/auth/signOut'),
}