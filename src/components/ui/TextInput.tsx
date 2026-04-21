import type { InputHTMLAttributes } from 'react'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  helperText?: string
}

export function TextInput({
  label,
  helperText,
  id,
  className,
  ...inputProps
}: TextInputProps) {
  return (
    <label className={`field ${className ?? ''}`.trim()} htmlFor={id}>
      <span className="field-label">{label}</span>
      <input className="field-input" id={id} {...inputProps} />
      {helperText ? <span className="field-helper">{helperText}</span> : null}
    </label>
  )
}