import React, { InputHTMLAttributes } from "react"
import useInputHelper from "../../../../hooks/useInputHelper/useInputHelper.hook"
import { InputGroup, Label, HelperText } from "../../../atoms"
import { Select } from "./SelectField.styles"

type SelectFieldProps = InputHTMLAttributes<HTMLSelectElement> & {
    options: string[],
    // onChange: (value:string) => void,
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
            <Select {...props} id={name} disabled={disabled}>
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