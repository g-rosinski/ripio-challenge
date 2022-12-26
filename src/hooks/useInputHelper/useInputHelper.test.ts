import { renderHook } from '@testing-library/react'
import useInputHelper from './useInputHelper.hook'

describe('useInputHelper', () => {

    const infoMessage = "Debe ingresar un dato"
    const errorMessage = "Valor incorrecto"
    const successMessage = "Valor correcto"

    test('Se inicialice correctamente', () => {
        const { result } = renderHook(() => useInputHelper({info: ""}))
        expect(result.current.displayHelperText).toBe(false)
        expect(result.current.interactive).toBe(true)
        expect(result.current.helperStatus).toBe('info')
        expect(result.current.helperText).toBe('')
    })

    test('Retorne mensaje de info como helperText', () => {
        const { result } = renderHook(() => useInputHelper({info: infoMessage}))
        expect(result.current.displayHelperText).toBe(true)
        expect(result.current.interactive).toBe(true)
        expect(result.current.helperStatus).toBe('info')
        expect(result.current.helperText).toBe(infoMessage)
    })

    test('Retorne mensaje de error como helperText', () => {
        const { result } = renderHook(() => useInputHelper({info: "", error: errorMessage}))
        expect(result.current.displayHelperText).toBe(true)
        expect(result.current.interactive).toBe(true)
        expect(result.current.helperStatus).toBe('error')
        expect(result.current.helperText).toBe(errorMessage)
    })

    test('Retorne mensaje de success como helperText', () => {
        const { result } = renderHook(() => useInputHelper({info: "", success: successMessage}))
        expect(result.current.displayHelperText).toBe(true)
        expect(result.current.interactive).toBe(true)
        expect(result.current.helperStatus).toBe('success')
        expect(result.current.helperText).toBe(successMessage)
    })

    test('Siempre debe retornar un mensaje en helperText priorizando error > success > info', () => {
        const { result, rerender } = renderHook(useInputHelper, {
            initialProps: {
                info: infoMessage, 
                success: successMessage,
                error: errorMessage
            }
        })
        
        expect(result.current.helperStatus).toBe('error')
        expect(result.current.helperText).toBe(errorMessage)
        
        rerender({info: infoMessage, success: successMessage, error: ""})
        expect(result.current.helperStatus).toBe('success')
        expect(result.current.helperText).toBe(successMessage)

        rerender({info: infoMessage, success: "", error: ""})
        expect(result.current.helperStatus).toBe('info')
        expect(result.current.helperText).toBe(infoMessage)

    })

    test('Si se pasa disabled o readOnly en true, displayHelperText debe estar en false', () => {
        const { result, rerender } = renderHook(useInputHelper, {
            initialProps: {
                info: infoMessage, 
                disabled: true,
                readOnly: true
            }
        })
        
        expect(result.current.displayHelperText).toBe(false)
        expect(result.current.interactive).toBe(false)
        
        rerender({info: infoMessage, disabled: true, readOnly: false})
        expect(result.current.displayHelperText).toBe(false)
        expect(result.current.interactive).toBe(false)

        rerender({info: infoMessage, disabled: false, readOnly: true})
        expect(result.current.displayHelperText).toBe(false)
        expect(result.current.interactive).toBe(false)

        rerender({info: infoMessage, disabled: false, readOnly: false})
        expect(result.current.displayHelperText).toBe(true)
        expect(result.current.interactive).toBe(true)

    })

})