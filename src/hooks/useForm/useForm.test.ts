import { renderHook, act } from '@testing-library/react'
import { ChangeEvent, FormEvent } from 'react'
import { useForm } from './useForm.hook'

describe('useForm', () => {
    type FormType = {email: string, password: string}
    const initialValues: FormType = {email: '', password: ''}
    const validateForm = jest.fn()
    const onSubmit = jest.fn()

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('Se inicialice correctamente', () => {
        const { result } = renderHook(() => useForm({initialValues, validateForm, onSubmit}))
        expect(result.current.values).toStrictEqual(initialValues)
        expect(result.current.errors).toStrictEqual({})
        expect(typeof result.current.handleOnChangeField).toBe('function')
        expect(typeof result.current.handleOnSubmitForm).toBe('function')
    })

    it('Si se ejecuta onChangeField debe actualizar el valor', () => {
        const { result } = renderHook(() => useForm({initialValues, validateForm, onSubmit}))
        const event = {target:{name: 'email', value: 'juan@gmail.com'}} as ChangeEvent<HTMLInputElement>
        act(() => {
            result.current.handleOnChangeField(event)
        })
        expect(result.current.values.email).toBe('juan@gmail.com')
    })

    it('Cuando se llama handleOnSubmitForm se debe llamar al callback de validacion', () => {
        const { result } = renderHook(() => useForm({initialValues, validateForm, onSubmit}))
        validateForm.mockReturnValue({})
        const submitEvent = { preventDefault: jest.fn } as unknown as FormEvent
        act(() => {
            result.current.handleOnSubmitForm(submitEvent)
        })
        
        expect(validateForm).toBeCalledWith(initialValues)
    })

    it('Si el callback de validacion no posee errores el callback onSubmit se llama', () => {
        const { result } = renderHook(() => useForm({initialValues, validateForm, onSubmit}))
        validateForm.mockReturnValue({})
        const submitEvent = { preventDefault: jest.fn } as unknown as FormEvent
        act(() => {
            result.current.handleOnSubmitForm(submitEvent)
        })
        
        expect(onSubmit).toBeCalledWith(initialValues)
    })

    it('Si el callback de validacion posee errores el callback onSubmit no se llama', () => {
        const { result } = renderHook(() => useForm({initialValues, validateForm, onSubmit}))
        validateForm.mockReturnValue({password: "Contrase??a invalida"})
        const submitEvent = { preventDefault: jest.fn } as unknown as FormEvent
        act(() => {
            result.current.handleOnSubmitForm(submitEvent)
        })
        
        expect(onSubmit).not.toBeCalled()
        expect(result.current.errors.password).toBe("Contrase??a invalida")
    })

})