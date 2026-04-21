export type AuthMode = 'login' | 'register'

export interface Credentials {
  username: string
  password: string
}

export type AuthMessage = {
  kind: 'error' | 'success'
  text: string
} | null