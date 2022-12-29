import { renderHook, act } from '@testing-library/react'
import { useFormValidator } from './useFormValidator.hook'

describe('useFormValidator', () => {
    const mockedRule = jest.fn()
    const form = {name: 'Juan'}
    const validations = {name: [mockedRule]}

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('Formulario valido debe tener un string vacio', async () => {
        const { result } = renderHook(() => useFormValidator())
        expect(typeof result.current.validateForm).toBe('function')
        let validationResult;
        act(() => {
            validationResult = result.current.validateForm(form, validations)
        })
        expect(validationResult).toStrictEqual({name: ''})
    })

    it('Formulario invalido debe tener un mensaje junto a la key', async () => {
        const { result } = renderHook(() => useFormValidator())
        mockedRule.mockReturnValue("Nombre invalido")
        let validationResult;
        act(() => {
            validationResult = result.current.validateForm(form, validations)
        })
        expect(validationResult).toStrictEqual({name: 'Nombre invalido'})
    })

    it('Debe devolver el mensaje de la primera rule que no cumpla', async () => {
        const { result } = renderHook(() => useFormValidator())
        const rules = [
            jest.fn().mockReturnValue(""),
            jest.fn().mockReturnValue("Es requerido"),
            jest.fn().mockReturnValue("El valor no es valido")
        ]
        let validationResult;
        act(() => {
            validationResult = result.current.validateForm(form, {name: rules})
        })
        expect(validationResult).toStrictEqual({name: 'Es requerido'})
    })

    it('Cuando un campo no posee validacion no se retorna entre los campos validados', async () => {
        const { result } = renderHook(() => useFormValidator())
        let validationResult;
        act(() => {
            validationResult = result.current.validateForm(form, {})
        })
        expect(validationResult).toStrictEqual({})

        act(() => {
            validationResult = result.current.validateForm(form, {name: []})
        })
        expect(validationResult).toStrictEqual({})
    })
})