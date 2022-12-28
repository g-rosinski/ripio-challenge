import React, { InputHTMLAttributes } from "react"
import useInputHelper from "../../../../hooks/useInputHelper/useInputHelper.hook"
import { InputGroup, Label, HelperText, Select } from "../../../atoms"

export type SelectOption = {
    value: string,
    label?: string
}

type SelectFieldProps = InputHTMLAttributes<HTMLSelectElement> & {
    options: SelectOption[],
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
                    options.map(({value, label}, i) => 
                        <option key={i} value={value}>{label || value}</option>
                    )
                }
            </Select>
            { displayHelperText && <HelperText status={helperStatus}>{ helperText }</HelperText> }
        </InputGroup>
    )
}

export default SelectField