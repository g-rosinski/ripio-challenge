import React, { InputHTMLAttributes, ChangeEvent } from "react"
import useInputHelper from "../../../../hooks/useInputHelper/useInputHelper.hook"
import { InputGroup, Label, HelperText, Input } from "../../../atoms"

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> & {
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    label?: string,
    helper?: string,
    error?: string,
}

const TextField: React.FC<TextFieldProps> = ({
    value, 
    label, 
    helper = "", 
    error,
    disabled,
    onChange,
    name,
    ...props
}) => {
    const { displayHelperText, helperText, helperStatus} = useInputHelper({
        disabled,
        error,
        info: helper
    })
    
    return (
        <InputGroup>
            {label && <Label htmlFor={name}>{label}</Label>}
            <Input 
                id={name}
                type={'text'}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                {...props}
            />
            { displayHelperText && <HelperText status={helperStatus}>{ helperText }</HelperText> }
        </InputGroup>
    )
}

export default TextField