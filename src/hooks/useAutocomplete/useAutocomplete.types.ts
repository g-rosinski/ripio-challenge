export type UseAutocompleteProps<Element> = {
    value: string,
    options: string[],
    onQuery: (query:string) => void,
    onSelectOption: (value:string) => void,
    onChange: (e: React.ChangeEvent<Element>) => void,
    onFocus?: (e: React.FocusEvent<Element>) => void,
    onBlur?: (e: React.FocusEvent<Element>) => void
}

export type UseAutocompleteReturn<Element> = {
    displayOptions: boolean,
    focused: boolean,
    handleOnClickOption: (option:string) => void,
    handleOnChange: (e: React.ChangeEvent<Element>) => void,
    handleOnFocus: (e: React.FocusEvent<Element>) => void,
    handleOnBlur: (e: React.FocusEvent<Element>) => void
}