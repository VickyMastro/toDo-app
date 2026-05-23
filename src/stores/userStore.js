import { defineStore } from 'pinia'

const BASE_URL = `${import.meta.env.VITE_SUPABASE_URL}/auth/v1`
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

function authFetch(path, options = {}, accessToken = null) {
  const headers = {
    'Content-Type': 'application/json',
    apikey: ANON_KEY,
  }
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`
  }
  return fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  })
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      username: '',
    },
    accessToken: null,
  }),
  actions: {
    async restoreSession() {
      const fromLocal = localStorage.getItem('refresh_token')
      const fromSession = sessionStorage.getItem('refresh_token')
      const token = fromLocal || fromSession
      if (!token) return

      const storage = fromLocal ? localStorage : sessionStorage

      const res = await authFetch('/token?grant_type=refresh_token', {
        method: 'POST',
        body: JSON.stringify({ refresh_token: token }),
      })

      if (!res.ok) {
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('access_token')
        sessionStorage.removeItem('refresh_token')
        sessionStorage.removeItem('access_token')
        return
      }

      const data = await res.json()

      storage.setItem('access_token', data.access_token)
      storage.setItem('refresh_token', data.refresh_token)

      this.accessToken = data.access_token
      this.user = {
        id: data.user.id,
        email: data.user.email,
        username: data.user.user_metadata.username,
      }
    },

    async createUser(username, email, password) {
      const res = await authFetch('/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password, data: { username } }),
      })
      const data = await res.json()

      if (data.code === 422) {
        throw new Error('Error al crear el usuario')
      }

      this.user = {
        id: data.user.id,
        email: data.user.email,
        username: data.user.user_metadata.username,
      }
      this.accessToken = data.access_token

      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      sessionStorage.removeItem('access_token')
      sessionStorage.removeItem('refresh_token')
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('refresh_token', data.refresh_token)
    },

    async logIn(email, password, rememberUser) {
      const res = await authFetch('/token?grant_type=password', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()

      if (data.code === 400) {
        throw new Error('Error al iniciar sesion')
      }

      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      sessionStorage.removeItem('access_token')
      sessionStorage.removeItem('refresh_token')

      const storage = rememberUser ? localStorage : sessionStorage
      storage.setItem('access_token', data.access_token)
      storage.setItem('refresh_token', data.refresh_token)

      this.user = {
        id: data.user.id,
        username: data.user.user_metadata.username,
        email: data.user.email,
      }
      this.accessToken = data.access_token
    },

    async logOut() {
      try {
        const res = await authFetch('/logout', { method: 'POST' }, this.accessToken)

        if (!res.ok) {
          const error = await res.json()
          throw new Error(error.error_description)
        }
      } finally {
        this.accessToken = null
        this.user = { username: '' }
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        sessionStorage.removeItem('access_token')
        sessionStorage.removeItem('refresh_token')
      }
    },

    async emailToRecoverPassword(email) {
      const redirectTo = encodeURIComponent('http://localhost:5173/change-password')
      const res = await authFetch(`/recover?redirect_to=${redirectTo}`, {
        method: 'POST',
        body: JSON.stringify({ email }),
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error('Error al intentar cambiar la contraseña')
      }
    },

    async recoverPassword(newPassword) {
      const res = await authFetch(
        '/user',
        {
          method: 'PUT',
          body: JSON.stringify({ password: newPassword }),
        },
        this.accessToken,
      )

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error_description)
      }

      this.accessToken = null
    },

    async updateUserData(newUsername, newPassword) {
      var payload = { data: { username: newUsername } }

      if (newPassword) {
        payload.password = newPassword
      }

      const res = await authFetch(
        '/user',
        {
          method: 'PUT',
          body: JSON.stringify(payload),
        },
        this.accessToken,
      )

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error_description)
      }

      this.user.username = newUsername
    },
  },
})
