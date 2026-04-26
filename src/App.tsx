import './App.css'
import { useState } from 'react'
import type { AuthMode, Credentials, AuthMessage, Todo, TodoFilter } from './types'
import {AuthPanel} from './components/auth/AuthPanel'
import { TodoPanel } from './components/todo/TodoPanel'
import { 
  getUsersFromStorage,
  saveUsersToStorage,
  getTodosFromStorage,
  saveTodosToStorage,
  getSession,
  setSession
} from './storage/localStorage'

interface InitialAppState {
  credentials: Credentials
  sessionUser: string | null
  todos: Todo[]
}

function getInitialAppState(): InitialAppState {
  const users = getUsersFromStorage()
  const sessionUser = getSession()

  if (sessionUser && users.some((user) => user.username === sessionUser)) {
    return {
      credentials: {
        username: sessionUser,
        password: '',
      },
      sessionUser: sessionUser,
      todos: getTodosFromStorage(sessionUser),
    }
  }

  setSession(null)
  return {
    credentials: {
      username: '',
      password: '',
    },
    sessionUser: null,
    todos: [],
  }
}

function App() {
  const [initialState] = useState(getInitialAppState())
  const [sessionUser, setSessionUser] = useState<string | null>(initialState.sessionUser)
  const [authMode, setMode] = useState<AuthMode>('login')
  const [credentials, setCredentials] = useState<Credentials>(initialState.credentials)
  const [authMessage, setAuthMessage] = useState<AuthMessage | null>(null)
  const [todoDraft, setTodoDraft] = useState('')
  const [todos, setTodos] = useState<Todo[]>(initialState.todos)
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

    const users = getUsersFromStorage()
    const user = users.find(u => u.username === username && u.password === password)

    if (authMode === 'login') {
      if (!user) {
        setAuthMessage({
          kind: 'error',
          text: 'Invalid username or password.',
        })
        return
      }

      setSession(username)
      setSessionUser(username)
      setTodos(getTodosFromStorage(username))
      return
    }

    if (users.some(u => u.username === username)) {
      setAuthMessage({
        kind: 'error',
        text: 'Username already exists. Please choose another one.',
      })
      return
    }

    const newUser: Credentials = { username, password }
    saveUsersToStorage([...users, newUser])
    setSession(username)
    setSessionUser(username)
    setAuthMessage({
      kind: 'success',
      text: 'Registration successful! You can now log in.',
    })
    setMode('login')
  }

  const handleLogout = () => {
    setSession(null)
    setSessionUser(null)
    setCredentials({ username: '', password: '' })
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

    setTodos(prev => {
      const newTodo: Todo = {
        id: Date.now(),
        text: trimmedText,
        completed: false,
      }
      const updatedTodos = [newTodo, ...prev]
      saveTodosToStorage(sessionUser!, updatedTodos)
      return updatedTodos
    })
  }

  const handleToggleTodo = (id: number) => {
    setTodos(prev => {
      const updatedTodos = prev.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
      saveTodosToStorage(sessionUser!, updatedTodos)
      return updatedTodos
    })
  }

  const handleDeleteTodo = (id: number) => {
    setTodos(prev => {
      const updatedTodos = prev.filter(todo => todo.id !== id)
      saveTodosToStorage(sessionUser!, updatedTodos)
      return updatedTodos
    })
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
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
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
