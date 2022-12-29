import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TransferConfirmationForm } from './TransferConfirmationForm.component'
import { TransferConfirmationFormType } from './TransferConfirmationForm.types'

describe('<TransferConfirmationForm/>', () => {

    const initialValuesForm: TransferConfirmationFormType = { token: ''}
    const onSubmitMock = jest.fn()
    const validateForm = jest.fn()
    
    const baseProps = {
        initialValues: initialValuesForm,
        onSubmit: onSubmitMock,
        validateForm: validateForm
    }

    beforeEach(() => {
        jest.clearAllMocks()
        validateForm.mockReturnValue({})
    })

    test('Se reenderice correctamente', () => {
        const {container} = render(<TransferConfirmationForm {...baseProps}/>)
        expect(screen.getByRole('textbox',{name: /token/i})).toHaveValue("")
        expect(container).toMatchSnapshot()
    })

    test('Al hacer click verificar si no tiene errores debe hacer submit', () => {
        render(<TransferConfirmationForm {...baseProps}/>)

        userEvent.click(screen.getByRole('button',{name: /verificar/i}))
        expect(validateForm).toBeCalledWith({token: ''})
        expect(onSubmitMock).toBeCalledWith({token: ''})
    })

    test('Al hacer click verificar si tiene errores no debe hacer submit', () => {
        validateForm.mockReturnValue({token: "Token invalido"})
        render(<TransferConfirmationForm {...baseProps} />)

        userEvent.click(screen.getByRole('button', {name: /verificar/i}))
        expect(validateForm).toBeCalledWith({token: ''})
        expect(screen.getByText("Token invalido")).toBeInTheDocument()
        expect(onSubmitMock).not.toBeCalled()
    })

    test('Debe permitir ingresar valor de token inicial', () => {
        render(<TransferConfirmationForm {...baseProps} initialValues={{token: '111222'}} />)

        expect(screen.getByRole('textbox',{name: /token/i})).toHaveValue('111222')
        userEvent.click(screen.getByRole('button',{name: /verificar/i}))
        expect(validateForm).toBeCalledWith({token: '111222'})
        expect(onSubmitMock).toBeCalledWith({token: '111222'})
    })

    test('Si la prop editable esta en false no debe permitir ingresar un valor y cambiar el estilo del form', () => {
        render(<TransferConfirmationForm {...baseProps} editable={false} />)

        const input = screen.getByRole('textbox',{name: /token/i})
        const button = screen.getByRole('button',{name: /verificar/i})
        expect(input).toHaveValue('')

        userEvent.type(input, '123456')
        expect(input).toHaveValue('')

        userEvent.click(button)
        expect(validateForm).not.toBeCalled()
        expect(onSubmitMock).not.toBeCalled()
    })
})