import { TextInput } from '../ui/TextInput'
import type { AuthMode, Credentials, AuthMessage } from '../../types'

interface AuthFormProps {
    mode: AuthMode
    credentials: Credentials
    message: AuthMessage
    onFieldChange: (field: keyof Credentials, value: string) => void
    onSubmit: () => void
}

export function AuthForm({
    mode,
    credentials,
    message,
    onFieldChange,
    onSubmit
}: AuthFormProps){
     const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit()
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2 className="auth-form-title">{mode === 'login' ? 'Login' : 'Register'}</h2>
            <TextInput
                label="Username"
                value={credentials.username}
                onChange={(event) => onFieldChange('username', event.target.value)}
            />
            <TextInput
                label="Password"
                type="password"
                value={credentials.password}
                onChange={(event) => onFieldChange('password', event.target.value)}
            />
            <button className="auth-form-submit" type="submit">
                {mode === 'login' ? 'Login' : 'Register'}
            </button>

            {message ? (
                <div className={`auth-message ${message.kind}`}>
                    {message.text}
                </div>
            ) : null}
        </form>

    )
}