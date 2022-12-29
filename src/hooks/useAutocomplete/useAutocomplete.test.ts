import { renderHook, act } from '@testing-library/react'
import { useAutocomplete } from './useAutocomplete.hook'
import { ChangeEvent, useState } from 'react'
import { UseAutocompleteProps } from './useAutocomplete.types'

const changeEvent = (value: string) => ({ target: {value} } as unknown as ChangeEvent<HTMLInputElement>)
const focusEvent = {  } as unknown as React.FocusEvent<HTMLInputElement>

describe('useAutocomplete', () => {

    const onQuery= jest.fn()
    const onSelectOption= jest.fn()
    const onChange= jest.fn()
    const onFocus= jest.fn()
    const onBlur= jest.fn()
    const mockUseState= jest.fn()
    const setStateMock= jest.fn()

    const initialProps: UseAutocompleteProps<HTMLInputElement> = {
        value: '',
        options: [],
        onQuery,
        onSelectOption,
        onChange,
        onFocus,
        onBlur
    }

    jest.mock('react', () => ({
        ...jest.requireActual('react'),
        useState: mockUseState,
    }))    

    afterEach(() => {
        jest.clearAllMocks()
        mockUseState.mockImplementation(init => [init, setStateMock])
    })

    it("Se inicialice correctamente", () => {
        const { result } = renderHook(useAutocomplete, {initialProps})
        expect(result.current.focused).toBeFalsy()
        expect(result.current.displayOptions).toBeFalsy()
        expect(typeof result.current.handleOnClickOption).toBe('function')
        expect(typeof result.current.handleOnChange).toBe('function')
        expect(typeof result.current.handleOnFocus).toBe('function')
        expect(typeof result.current.handleOnBlur).toBe('function')
    })

    it("Si handleOnChange se llama debe llamar onQuery si el valor no esta seleccionado", () => {
        const { result } = renderHook(useAutocomplete, {initialProps})

        const changeEventEvent = { target: {value: 'test'} } as unknown as ChangeEvent<HTMLInputElement>
        act(() => {
            result.current.handleOnChange(changeEventEvent)
        })
        expect(onQuery).toBeCalledWith('test')
        expect(onChange).toBeCalled()
    })

    it("Si handleOnChange se llama no debe llamar onQuery si el valor esta seleccionado", () => {
        const { result } = renderHook(useAutocomplete, {
            initialProps: {
                ...initialProps,
                value: 'test'
            }
        })

        const changeEventEvent = { target: {value: 'test'} } as unknown as ChangeEvent<HTMLInputElement>
        act(() => {
            result.current.handleOnChange(changeEventEvent)
        })
        expect(onQuery).not.toBeCalled()
        expect(onChange).toBeCalled()
    })

    it("Si handleOnClickOption se llama debe guardar el valor y llamar al onSelectOption", () => {
        const { result, rerender } = renderHook(useAutocomplete, {initialProps})

        act(() => {
            result.current.handleOnClickOption('test')
        })
        expect(onSelectOption).toBeCalled()

        rerender({...initialProps, value: 'test'})
        act(() => {
            result.current.handleOnChange(changeEvent('test'))
        })
        expect(onQuery).not.toBeCalled()

        act(() => {
            result.current.handleOnChange(changeEvent('test@gmail.com'))
        })
        expect(onQuery).toBeCalledWith('test@gmail.com')
    })

    it("Si handleOnFocus y handleOnBlur se llama debe cambiar displayOptions", () => {
        const { result } = renderHook(useAutocomplete, {initialProps})

        act(() => {
            result.current.handleOnFocus(focusEvent)
        })
        expect(result.current.focused).toBe(true)
        expect(onFocus).toBeCalled()
        
        act(() => {
            result.current.handleOnBlur(focusEvent)
        })
        expect(result.current.focused).toBe(false)
        expect(onBlur).toBeCalled()
    })

    it("displayOptions debe estar en true si existen opciones y el input esta enfocado", () => {
        const { result, rerender } = renderHook(useAutocomplete, {initialProps})

        expect(result.current.displayOptions).toBe(false)

        rerender({
            ...initialProps,
            value: 'opcion',
            options: ['opcion 1', 'opcion 2'],
        })        
        expect(result.current.displayOptions).toBe(false)
        
        act(() => {
            result.current.handleOnFocus(focusEvent)
        })
        expect(result.current.displayOptions).toBe(true)
    })
})