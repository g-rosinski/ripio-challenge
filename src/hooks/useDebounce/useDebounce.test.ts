import { renderHook, act } from '@testing-library/react'
import useDebounce from './useDebounce.hook'

describe('useDebounce', () => { 
    jest.useFakeTimers()

    afterEach(() => {
        jest.clearAllTimers()
        jest.clearAllMocks()
    })
    
    test('Se inicialice correctamente', () => {
        const { result } = renderHook(() => useDebounce<string>(""))
        expect(typeof result.current[0]).toBe('string')
        expect(result.current[0]).toBe('')
    })
    
    test('Debe devolver el despues de 300ms(default) del último cambio', async () => {
        const { result, rerender } = renderHook(useDebounce<string>,{
            initialProps: ""
        })
        expect(result.current[0]).toBe('')
        
        rerender("Juan")
        act(() =>{
            jest.runAllTimers()
        })
        expect(result.current[0]).toBe('Juan')

    })
    
    test('Debe devolver el despues de {x}ms del último cambio', async () => {
        const { result, rerender } = renderHook(({value, delay}) => useDebounce<string>(value, delay),{
            initialProps: {
                value: "",
                delay: 1000
            }
        })
        expect(result.current[0]).toBe('')
        
        rerender({value:"Juan", delay: 1000})
        
        act(() =>{
            jest.runAllTimers()
        })
        expect(result.current[0]).toBe('Juan')

    })
})