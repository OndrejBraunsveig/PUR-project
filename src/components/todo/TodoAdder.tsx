import { TextInput } from "../ui/TextInput"

interface TodoAdderProps {
    draft: string
    onDraftChange: (value: string) => void
    onAdd: () => void
}

export function TodoAdder({
    draft,
    onDraftChange,
    onAdd
}: TodoAdderProps) {
    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        onAdd()
    }

    return (
        <form className="todo-adder" onSubmit={handleSubmit}>
            <TextInput
                label="New Todo"
                value={draft}
                onChange={(event) => onDraftChange(event.target.value)}
            />
            <button className="add-btn" type="submit">
                Add
            </button>
        </form>
    )
}
