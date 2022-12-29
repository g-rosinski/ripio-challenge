import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import SelectField from './SelectField.component'

describe('<SelectField/>', () => {

    const onChangeMock = jest.fn()
    const optionsMock = ['DAI','USDT','BTH','ETH'].map(c => ({value: c}))

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('Se espera que se reenderice correctamente', () => {
        
       const { container } = render(<SelectField options={optionsMock} onChange={onChangeMock} />)
        
        expect(screen.getByRole('combobox')).toHaveValue(optionsMock[0].value)
        expect(screen.queryAllByRole('option').length).toBe(4)
        expect(container).toMatchSnapshot()
    })

    test('Se espera que prop onChange al seleccionar otro valor', async () => {
        render(<SelectField options={optionsMock} onChange={onChangeMock} />)
        
        const select = screen.getByRole('combobox')
        
        userEvent.selectOptions(select,['USDT'])
        expect(onChangeMock).toHaveBeenCalledTimes(1)
        expect(select).toHaveValue('USDT')
    })

    
    test('Se espera que si disabled es true, la prop onChange no sea llamada', async () => {
        render(<SelectField options={optionsMock} onChange={onChangeMock} disabled />)
        
        const select = screen.getByRole('combobox')
        
        userEvent.selectOptions(select,['USDT'])
        expect(onChangeMock).not.toBeCalled()
        expect(select).toHaveValue(optionsMock[0].value)
    })

    test('Se espera que prop value se cambie al setear un value nuevo', async () => {
        const {rerender} = render(<SelectField options={optionsMock} value={""} onChange={onChangeMock} />)
        
        const select = screen.getByRole('combobox')
        
        expect(select).toHaveValue(optionsMock[0].value)

        optionsMock.forEach(option => {
            rerender(<SelectField options={optionsMock} value={option.value} onChange={onChangeMock} />)
            expect(select).toHaveValue(option.value)
        })
    })

    test('Se espera que al setear un label se reenderice un label', async () => {
        render(<SelectField options={optionsMock} label='Moneda' onChange={onChangeMock} />)
        
        expect(screen.getByText('Moneda')).toBeInTheDocument()
    })

    test('Se espera que al setear un helper se reenderice el helperText', async () => {
        render(<SelectField options={optionsMock} helper='Seleccione una moenda' onChange={onChangeMock} />)
        
        expect(screen.getByText('Seleccione una moenda')).toBeInTheDocument()
    })

    test('Se espera que al setear un error, helper se reenderice el error en el helperText', async () => {
        render(<SelectField options={optionsMock} error='Nombre no valido' helper='Ingrese un nombre' onChange={onChangeMock} />)
        
        expect(screen.getByText('Nombre no valido')).toBeInTheDocument()
        expect(screen.queryByText('Ingrese un nombre')).not.toBeInTheDocument()
    })

})