export type AuthMode = 'login' | 'register'
export type TodoFilter = 'all' | 'active' | 'completed'

export interface Credentials {
  username: string
  password: string
}

export type AuthMessage = {
  kind: 'error' | 'success'
  text: string
} | null

export interface Todo {
  id: number
  text: string
  completed: boolean
}