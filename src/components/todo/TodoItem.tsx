import type { Todo } from '../../types'

interface TodoItemProps {
    todo: Todo
    onToggle: (id: number) => void
    onDelete: (id: number) => void
}

export function TodoItem({
    todo,
    onToggle,
    onDelete
}: TodoItemProps) {
    const { id, text, completed } = todo
    return (
        <li className={`todo-item ${completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={completed}
                onChange={() => onToggle(id)}
            />
            <span className="todo-text">{text}</span>
            
            <button className="delete-btn" onClick={() => onDelete(id)}>
                Delete
            </button>

        </li>
    )
}