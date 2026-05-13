import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import { description } from 'valibot'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const BASE = `${SUPABASE_URL}/rest/v1/todos`

const headers = {
  apikey: SUPABASE_KEY,
  'Content-Type': 'application/json',
}

export const useToDosStore = defineStore('toDos', {
  state: () => ({
    toDos: [],
    filter: 'all',
  }),
  actions: {
    async getToDos() {
      const userStore = useUserStore()

      const res = await fetch(`${BASE}?select=*&order=created_at.desc`, {
        headers: {
          ...headers,
          Authorization: `Bearer ${userStore.accessToken}`,
        },
      })

      if (!res.ok) {
        throw new Error()
      }

      this.toDos = await res.json()
    },

    async addToDo(description) {
      const userStore = useUserStore()
      const res = await fetch(BASE, {
        method: 'POST',
        headers: {
          ...headers,
          Authorization: `Bearer ${userStore.accessToken}`,
          Prefer: 'return=representation',
        },
        body: JSON.stringify({ description, completed: false, user_id: userStore.user.id }),
      })

      if (!res.ok) {
        throw new Error()
      }

      const [todo] = await res.json()
      this.toDos.unshift(todo)
    },

    async updateToDo(id, changes) {
      const userStore = useUserStore()

      const res = await fetch(`${BASE}?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
          ...headers,
          Authorization: `Bearer ${userStore.accessToken}`,
          Prefer: 'return=representation',
        },
        body: JSON.stringify({
          description: changes.description,
          completed: changes.completed,
          user_id: userStore.user.id,
        }),
      })

      if (!res.ok) {
        throw new Error()
      }

      const [updated] = await res.json()
      const index = this.toDos.findIndex((t) => t.id === id)
      if (index !== -1) this.toDos[index] = updated
    },

    async deleteToDo(id) {
      const userStore = useUserStore()

      await fetch(`${BASE}?id=eq.${id}`, {
        method: 'DELETE',
        headers: {
          ...headers,
          Authorization: `Bearer ${userStore.accessToken}`,
        },
      })

      this.toDos = this.toDos.filter((t) => t.id !== id)
    },
  },
  getters: {
    filteredToDos(state) {
      if (state.filter === 'pending') return state.toDos.filter((t) => !t.completed)
      if (state.filter === 'done') return state.toDos.filter((t) => t.completed)
      return state.toDos
    },
  },
})
