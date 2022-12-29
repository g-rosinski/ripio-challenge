import React, { ComponentProps } from "react"
import TextField from "../TextField/TextField.component"
import { ACContainer, ACOption, ACOptionsContainer, ACOptionsList } from "./AutocompleteField.styles"
import { useAutocomplete } from "../../../../hooks"

type AutocompleteFieldProps = ComponentProps<typeof TextField> & {
    onQuery: (query:string) => void,
    onSelectOption: (value:string) => void,
    options: string[]
}

const AutocompleteField: React.FC<AutocompleteFieldProps> = ({
    value,
    onChange,
    onSelectOption,
    onQuery,
    options,
    onFocus,
    onBlur,
    ...textFieldProps
}) => {
    const {
        displayOptions,
        handleOnChange,
        handleOnBlur,
        handleOnFocus,
        handleOnClickOption
    } = useAutocomplete<HTMLInputElement>({
        value,
        options,
        onQuery,
        onSelectOption,
        onChange,
        onFocus,
        onBlur
    })
    
    return (
        <ACContainer>
            <TextField 
                {...textFieldProps}
                value={value}
                onChange={handleOnChange}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                autoComplete="off"
            />
            { displayOptions && (
                <ACOptionsContainer>
                    <ACOptionsList role="list">
                        {options.map((option, i) => 
                            <ACOption 
                                key={i} 
                                role="listitem"
                                onClick={() => handleOnClickOption(option)} 
                                onMouseDown={e => e.preventDefault()}
                            >
                                {option}
                            </ACOption>
                        )}
                    </ACOptionsList>
                </ACOptionsContainer>
            )}
        </ACContainer>
    )
}

export default AutocompleteField