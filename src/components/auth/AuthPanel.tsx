import { AuthForm } from "./AuthForm";
import type { AuthMode, Credentials, AuthMessage } from '../../types'

interface AuthPanelProps {
    mode: AuthMode
    credentials: Credentials
    message: AuthMessage
    onFieldChange: (field: keyof Credentials, value: string) => void
    onSubmit: () => void
    onModeChange: (mode: AuthMode) => void
}

export function AuthPanel({
    mode,
    credentials,
    message,
    onFieldChange,
    onSubmit,
    onModeChange
}: AuthPanelProps){
    return (
        <section className="auth-panel">
            <div className="mode-switch">
                <button
                    type="button"
                    className={`auth-control-toggle ${mode === 'login' ? 'active' : ''}`}
                    onClick={() => onModeChange('login')}
                >
                    Login
                </button>
                <button
                    type="button"
                    className={`auth-control-toggle ${mode === 'register' ? 'active' : ''}`}
                    onClick={() => onModeChange('register')}
                >
                    Register
                </button>
            </div>
            <AuthForm
                    mode={mode}
                    credentials={credentials}
                    message={message}
                    onFieldChange={onFieldChange}
                    onSubmit={onSubmit}
            />
        </section>

    )
}
