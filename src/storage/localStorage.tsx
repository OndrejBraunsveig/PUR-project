import type { Credentials, Todo } from "../types";

const USERS_STORAGE_KEY = 'users';
const TODOS_STORAGE_KEY = 'todos';
const SESSION_USER_KEY = 'session_user';

export function getUsersFromStorage(): Credentials[] {
  const users = localStorage.getItem(USERS_STORAGE_KEY);
  return users ? JSON.parse(users) : [];
}

export function saveUsersToStorage(users: Credentials[]) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

export function getTodosFromStorage(username: string): Todo[] {
  const todos = localStorage.getItem(`${TODOS_STORAGE_KEY}_${username}`);
  return todos ? JSON.parse(todos) : [];
}

export function saveTodosToStorage(username: string, todos: Todo[]) {
  localStorage.setItem(`${TODOS_STORAGE_KEY}_${username}`, JSON.stringify(todos));
}

export function getSession(): string | null {
  return localStorage.getItem(SESSION_USER_KEY);
}

export function setSession(username: string | null) {
  if (username) {
    localStorage.setItem(SESSION_USER_KEY, username);
  } else {
    localStorage.removeItem(SESSION_USER_KEY);
  }
}