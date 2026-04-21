import './App.css'
import { useState } from 'react'
import type { AuthMode, Credentials, AuthMessage, Todo, TodoFilter } from './types'
import {AuthPanel} from './components/auth/AuthPanel'
import { TodoPanel } from './components/todo/TodoPanel'

function App() {
  const [sessionUser, setSessionUser] = useState<string | null>(null)
  const [authMode, setMode] = useState<AuthMode>('login')
  const [credentials, setCredentials] = useState<Credentials>({
    username: '',
    password: ''
  })
  const [authMessage, setAuthMessage] = useState<AuthMessage | null>(null)
  const [todoDraft, setTodoDraft] = useState('')
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<TodoFilter>('all')

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

    if (!username || !password) {
      setAuthMessage({
        kind: 'error',
        text: 'Please fill in both username and password.',
      })
      return
    }

    if (authMode === 'login') {
      if (username === 'user' && password === 'password') {
        setAuthMessage({
          kind: 'success',
          text: 'Login successful!',
        })
        setSessionUser(username)
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

  const handleLogout = () => {
    setSessionUser(null)
    setTodos([])
    setFilter('all')
    setAuthMessage({
      kind: 'success',
      text: 'You have been logged out successfully.'
    })
  }

  const handleDraftChange = (value: string) => {
    setTodoDraft(value)
  }

  const handleAddTodo = () => {
    const trimmedText = todoDraft.trim()
    if (!trimmedText) return

    const newTodo: Todo = {
      id: Date.now(),
      text: trimmedText,
      completed: false
    }

    setTodos(prev => [newTodo, ...prev])
    setTodoDraft('')
  }

  return (
    <div className="App">
      {credentials.username? (
        <div className="welcome-message">
          {credentials.username}&apos;s Todo List
        </div>
        ) : (
          <div className="welcome-message">
            Todo List
          </div>
        )}

      {sessionUser ? (
        <TodoPanel
          draft={todoDraft}
          todos={todos}
          filter={filter}
          onDraftChange={handleDraftChange}
          onAdd={handleAddTodo}
          onToggle={(id) => setTodos(prev => prev.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))}
          onDelete={(id) => setTodos(prev => prev.filter(todo => todo.id !== id))}
          onFilterChange={setFilter}
          onLogout={handleLogout}
        />
      ) : (
        <AuthPanel
          mode={authMode}
          credentials={credentials}
          message={authMessage}
          onFieldChange={handleCredentialChange}
          onSubmit={handleAuthenticate}
          onModeChange={handleModeChange}
        />
      )}
    </div>

  )
}

export default App
