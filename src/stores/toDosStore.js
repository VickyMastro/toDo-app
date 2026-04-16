import { defineStore } from 'pinia'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const BASE = `${SUPABASE_URL}/rest/v1/todos`

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
}

export const useToDosStore = defineStore('toDos', {
  state: () => ({
    toDos: [],
    filter: 'all',
  }),
  actions: {
    async getToDos() {
      const res = await fetch(`${BASE}?select=*&order=created_at.desc`, { headers })
      this.toDos = await res.json()
    },

    async addToDo(description) {
      const res = await fetch(BASE, {
        method: 'POST',
        headers: { ...headers, Prefer: 'return=representation' },
        body: JSON.stringify({ description, completed: false }),
      })
      const [todo] = await res.json()
      this.toDos.unshift(todo)
    },

    async updateToDo(id, changes) {
      const res = await fetch(`${BASE}?id=eq.${id}`, {
        method: 'PATCH',
        headers: { ...headers, Prefer: 'return=representation' },
        body: JSON.stringify(changes),
      })
      const [updated] = await res.json()
      const index = this.toDos.findIndex((t) => t.id === id)
      if (index !== -1) this.toDos[index] = updated
    },

    async deleteToDo(id) {
      await fetch(`${BASE}?id=eq.${id}`, { method: 'DELETE', headers })
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
