import {forwardRef} from "react";
import {TextField} from "@mui/material";

interface InputFieldProps {
    id: string
    placeholder: string
    disabled?: boolean
    children?: never
    type: string
}

export const Field = forwardRef<HTMLInputElement, InputFieldProps>((
    {id, placeholder, disabled, children, type, ...other},
        ref
) => {
    return (
        <div>
            <TextField ref={ref} id={id} placeholder={placeholder} disabled={disabled} type={type} {...other}>{children}</TextField>
        </div>
    )
})

Field.displayName = 'field'