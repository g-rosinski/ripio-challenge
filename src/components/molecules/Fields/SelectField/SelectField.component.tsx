import React, { InputHTMLAttributes } from "react"
import useInputHelper from "../../../../hooks/useInputHelper/useInputHelper.hook"
import { InputGroup, Label, HelperText, Select } from "../../../atoms"

type SelectFieldProps = InputHTMLAttributes<HTMLSelectElement> & {
    options: string[],
    label?: string,
    helper?: string,
    error?: string,
}

const SelectField: React.FC<SelectFieldProps> = ({
    options, 
    label, 
    helper = "", 
    error,
    disabled,
    name,
    ...props
}) => {
    const { displayHelperText, helperText, helperStatus } = useInputHelper({
        disabled,
        error,
        info: helper
    })

    return (
        <InputGroup>
            { !!label && <Label htmlFor={name}>{label}</Label> }
            <Select id={name} disabled={disabled} {...props}>
                { 
                    options.map((option, i) => 
                        <option key={i} value={option}>{option}</option>
                    )
                }
            </Select>
            { displayHelperText && <HelperText status={helperStatus}>{ helperText }</HelperText> }
        </InputGroup>
    )
}

export default SelectField