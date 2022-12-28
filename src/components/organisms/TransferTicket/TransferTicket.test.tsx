import { render, screen } from "@testing-library/react"
import React from "react"
import { TransferTicket, TransferTicketProps } from "./TransferTicket.component"

describe('<TransferTicket />', () => {

    const baseProps: TransferTicketProps = { 
        emiter: 'emisor@mail.com', 
        receptor: 'receptor@mail.com', 
        currency: 'ETH', 
        amount: 1100,
        transfer_date: new Date(Date.now()),
        status: 'COMPLETED'
    }

    test('Se reenderice Correctamente', () => {
        const { container } = render(<TransferTicket {...baseProps} />)

        expect(screen.getByText('ETH $ 1.100,00')).toBeInTheDocument()
        expect(container).toMatchSnapshot()
    })
})