import './App.css'
import { useState } from 'react'
import type { AuthMode, Credentials, AuthMessage } from './types'
import {AuthPanel} from './components/auth/AuthPanel'

function App() {
  const [authMode, setMode] = useState<AuthMode>('login')
  const [credentials, setCredentials] = useState<Credentials>({
    username: '',
    password: ''
  })
  const [authMessage, setAuthMessage] = useState<AuthMessage | null>(null)

  const handleCredentialChange = (field: keyof Credentials, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }))
  }

  const handleModeChange = (mode: AuthMode) => {
    setMode(mode)
    setAuthMessage(null)
  }

  const handleAuthenticate = () => {
    const username = credentials.username.trim()
    const password = credentials.password.trim()
    const normalizedUsername = username.toLowerCase()

    if (!username || !password) {
      setAuthMessage({
        kind: 'error',
        text: 'Please fill in both username and password.',
      })
      return
    }

    if (authMode === 'login') {
      if (normalizedUsername === 'user' && password === 'password') {
        setAuthMessage({
          kind: 'success',
          text: 'Login successful!',
        })
        return
      }

      setAuthMessage({
        kind: 'error',
        text: 'Invalid username or password.',
      })
      return
    }

    setAuthMessage({
      kind: 'success',
      text: 'Registration successful! You can now log in.',
    })
    setMode('login')
  }

  return (
    <div className="App">
      <AuthPanel
        mode={authMode}
        credentials={credentials}
        message={authMessage}
        onFieldChange={handleCredentialChange}
        onSubmit={handleAuthenticate}
        onModeChange={handleModeChange}
      />
    </div>

  )
}

export default App
