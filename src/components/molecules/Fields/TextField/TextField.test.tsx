import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import TextField from './TextField.component'

describe('<TextField/>', () => {

    const onChangeMock = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('Se espera que se reenderice correctamente', () => {
        const {container} = render(<TextField value={""} onChange={onChangeMock} />)
        
        expect(screen.getByRole('textbox')).toHaveValue("")
        expect(screen.getByRole('textbox')).toHaveProperty("type",'text')
        expect(container).toMatchSnapshot()
    })

    test('Se espera que prop onChange al tipear un valor', async () => {
        render(<TextField value={""} onChange={onChangeMock} />)
        
        const input = screen.getByRole('textbox')
        expect(input).toHaveValue("")
        
        userEvent.type(input, 'Lionel')
        expect(onChangeMock).toHaveBeenCalledTimes(6)
    })

    
    test('Se espera que si disabled es true, la prop onChange no sea llamada', async () => {
        render(<TextField value={""} onChange={onChangeMock} disabled />)

        const input = screen.getByRole('textbox')
        
        userEvent.type(input, 'Lionel')
        expect(onChangeMock).not.toBeCalled()
    })

    test('Se espera que prop value se cambie al setear un value nuevo', async () => {
        const {rerender} = render(<TextField value={""} onChange={onChangeMock} />)
        
        const input = screen.getByRole('textbox')
        expect(input).toHaveValue("")
        
        rerender(<TextField value={"Lionel"} onChange={onChangeMock} />)
        expect(input).toHaveValue('Lionel')
    })

    test('Se espera que al setear un label se reenderice un label', async () => {
        render(<TextField label='Nombre' value={""} onChange={onChangeMock} />)
        
        expect(screen.getByText('Nombre')).toBeInTheDocument()
    })

    test('Se espera que al setear un helper se reenderice el helperText', async () => {
        render(<TextField helper='Ingrese un nombre' value={""} onChange={onChangeMock} />)
        
        expect(screen.getByText('Ingrese un nombre')).toBeInTheDocument()
    })

    test('Se espera que al setear un error, helper se reenderice el error en el helperText', async () => {
        render(<TextField error='Nombre no valido' helper='Ingrese un nombre' value={""} onChange={onChangeMock} />)
        
        expect(screen.getByText('Nombre no valido')).toBeInTheDocument()
        expect(screen.queryByText('Ingrese un nombre')).not.toBeInTheDocument()
    })

})