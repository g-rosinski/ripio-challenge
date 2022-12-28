import { render, screen } from "@testing-library/react"
import React from "react"
import { LabellyRecord } from "./LabellyRecord.component"

describe('<LabellyRecord />', () => {

    const baseProps = { 
        label: 'Cuenta de destino', 
        value: 'receptor@mail.com',
    }

    test('Se reenderice Correctamente', () => {
        const { container } = render(<LabellyRecord {...baseProps} />)

        expect(screen.getByRole('presentation')).toBeInTheDocument()
        expect(container).toMatchSnapshot()
    })

    test('Que no se muestre el divider si displayDivider=false', () => {
        render(<LabellyRecord {...baseProps} displayDivider={false} />)

        expect(screen.queryByRole('presentation')).toBeFalsy()
    })
})