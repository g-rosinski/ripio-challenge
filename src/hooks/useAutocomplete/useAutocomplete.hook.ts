import { useState, useMemo } from "react"
import { UseAutocompleteProps, UseAutocompleteReturn } from "./useAutocomplete.types"

export const useAutocomplete = <Element extends HTMLInputElement>({
    value, 
    options, 
    onQuery, 
    onSelectOption, 
    onChange, 
    onFocus, 
    onBlur
}: UseAutocompleteProps<Element>):UseAutocompleteReturn<Element> => {
    const [selectedValue, setSelectedValue] = useState<string>(value)
    const [focused, setFocused] = useState<boolean>(false)
    const displayOptions = useMemo(() => (focused && value !== selectedValue && !!options.length)
    ,[focused, value, selectedValue, options])

    const handleOnClickOption = (option:string) => {
        setSelectedValue(option)
        onSelectOption(option)
    }

    const handleOnChange = (e: React.ChangeEvent<Element>) => {
        onChange(e)
        const query = e.target.value
        if(query && selectedValue !== query ){
            onQuery(query)
        }
    }

    const handleOnFocus = (e: React.FocusEvent<Element>) => {
        setFocused(true)
        !!onFocus && onFocus(e)
    }

    const handleOnBlur = (e: React.FocusEvent<Element>) => {
        setFocused(false)
        !!onBlur && onBlur(e)
    }

    return {
        focused,
        displayOptions,
        handleOnClickOption,
        handleOnChange,
        handleOnFocus,
        handleOnBlur
    }
}