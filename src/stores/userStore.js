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
      const token = localStorage.getItem('access_token')
      if (!token) return

      const res = await authFetch('/user', {}, token)
      if (res.ok) {
        const data = await res.json()
        this.accessToken = token
        this.user = { id: data.id, email: data.email, username: data.user_metadata.username }

        return this.user
      } else {
        localStorage.removeItem('access_token')
        throw new Error('estoy en restoreSession')
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
        username: data.user.user_metadata.username,
      }
      this.accessToken = data.access_token
      localStorage.setItem('access_token', data.access_token)
    },

    async logIn(email, password) {
      const res = await authFetch('/token?grant_type=password', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()

      if (data.code === 400) {
        throw new Error('Error al iniciar sesion')
      }

      this.user = {
        id: data.user.id,
        username: data.user.user_metadata.username,
        email: data.user.email,
      }
      this.accessToken = data.access_token
      localStorage.setItem('access_token', data.access_token)
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
      }
    },

    /* async recoveryPassword(email) {

        const res = await authFetch('/recover', {
          method: 'POST',
          body: JSON.stringify({ email }),
        })
        const data = await res.json()
        console.log(data)

        if (data.code === 400) {
          throw new Error('Ocurrio un error')
        }

    }, */

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
