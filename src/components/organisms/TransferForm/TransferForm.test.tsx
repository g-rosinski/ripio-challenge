import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TransferForm } from './TransferForm.component'
import { TransferFormType } from './TransferForm.types'

describe('<TransferForm/>', () => {

    const currencies = ['BTC', 'ETH', 'USDT', 'DAI'].map(c => ({value: c}))
    const initialValuesForm: TransferFormType = { emiter: 'usuario@mail.com', receptor: '', currency: currencies[0].value, amount: ''}
    const onSubmitMock = jest.fn()
    const validateForm = jest.fn()
    
    const baseProps = {
        initialValues: initialValuesForm,
        onSubmit: onSubmitMock,
        validateForm: validateForm,
        currencies
    }

    beforeEach(() => {
        jest.clearAllMocks()
        validateForm.mockReturnValue({})
    })

    test('Se reenderice correctamente', () => {
        const {container} = render(<TransferForm {...baseProps}/>)
        expect(screen.getByRole('textbox',{name: /emisor/i})).toHaveValue(initialValuesForm.emiter)
        expect(screen.getByRole('textbox',{name: /emisor/i})).toHaveAttribute('readonly')
        expect(screen.getByRole('textbox',{name: /destinatario/i})).toHaveValue(initialValuesForm.receptor)
        expect(screen.getByRole('combobox',{name: /moneda/i})).toHaveValue(initialValuesForm.currency)
        expect(screen.getByRole('textbox',{name: /importe/i})).toHaveValue(initialValuesForm.amount)
        expect(container).toMatchSnapshot()
    })

    test('Al hacer click verificar si no tiene errores debe hacer submit', () => {
        render(<TransferForm {...baseProps}/>)

        userEvent.click(screen.getByRole('button',{name: /transferir/i}))
        expect(validateForm).toBeCalledWith(initialValuesForm)
        expect(onSubmitMock).toBeCalledWith(initialValuesForm)
    })

    test('Al hacer click verificar si tiene errores no debe hacer submit', () => {
        validateForm.mockReturnValue({receptor: "Destinatario invalido"})
        render(<TransferForm {...baseProps} />)

        userEvent.click(screen.getByRole('button', {name: /transferir/i}))
        expect(validateForm).toBeCalledWith(initialValuesForm)
        expect(screen.getByText("Destinatario invalido")).toBeInTheDocument()
        expect(onSubmitMock).not.toBeCalled()
    })

    test('Debe permitir ingresar valor de token inicial', () => {
        render(<TransferForm {...baseProps} initialValues={{...initialValuesForm, receptor: 'usuario@gmail.com'}} />)

        expect(screen.getByRole('textbox',{name: /destinatario/i})).toHaveValue('usuario@gmail.com')
        userEvent.click(screen.getByRole('button',{name: /transferir/i}))
        expect(validateForm).toBeCalledWith({...initialValuesForm, receptor: 'usuario@gmail.com'})
        expect(onSubmitMock).toBeCalledWith({...initialValuesForm, receptor: 'usuario@gmail.com'})
    })

    test('Si la prop editable esta en false no debe permitir ingresar un valor y cambiar el estilo del form', () => {
        render(<TransferForm {...baseProps} editable={false} />)

        const input = screen.getByRole('textbox',{name: /importe/i})
        const button = screen.getByRole('button',{name: /transferir/i})
        expect(input).toHaveValue('')

        userEvent.type(input, '150')
        expect(input).toHaveValue('')

        userEvent.click(button)
        expect(validateForm).not.toBeCalled()
        expect(onSubmitMock).not.toBeCalled()
    })
})