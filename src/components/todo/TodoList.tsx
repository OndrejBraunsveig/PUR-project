import type { TodoFilter, Todo } from '../../types'
import { TodoItem } from './TodoItem'

interface TodoListProps {
    todos: Todo[]
    filter: TodoFilter
    onToggle: (id: number) => void
    onDelete: (id: number) => void
}

export function TodoList({
    todos,
    filter,
    onToggle,
    onDelete
}: TodoListProps) {
    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed
        if (filter === 'completed') return todo.completed
        return true
    })

    return (
        <ul className="todo-list">
            {filteredTodos.map(todo => (
                <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete}/>
            ))}
        </ul>
    )
}

