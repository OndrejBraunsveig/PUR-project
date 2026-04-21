import type { Todo, TodoFilter } from '../../types'
import { TodoList } from './TodoList'
import { TodoAdder } from './TodoAdder'

interface TodoPanelProps {
    draft: string
    todos: Todo[]
    filter: TodoFilter
    onDraftChange: (value: string) => void
    onAdd: () => void
    onToggle: (id: number) => void
    onDelete: (id: number) => void
    onFilterChange: (filter: TodoFilter) => void
    onLogout: () => void
}

export function TodoPanel({
    draft,
    todos,
    filter,
    onDraftChange,
    onAdd,
    onToggle,
    onDelete,
    onFilterChange,
    onLogout,
}: TodoPanelProps) {
    return (
        <div className="todo-panel">
            <div className="filter-buttons">
                <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => onFilterChange('all')}>
                    All
                </button>
                <button className={`filter-btn ${filter === 'active' ? 'active' : ''}`} onClick={() => onFilterChange('active')}>
                    Active
                </button>
                <button className={`filter-btn ${filter === 'completed' ? 'active' : ''}`} onClick={() => onFilterChange('completed')}>
                    Completed
                </button>
                <button className="logout-btn" onClick={onLogout}>
                    Logout
                </button>
            </div>

            <TodoAdder
                draft={draft}
                onDraftChange={onDraftChange}
                onAdd={onAdd}
            />

            <TodoList
                todos={todos}
                filter={filter}
                onToggle={onToggle}
                onDelete={onDelete}
            />
        </div>
    )
}
