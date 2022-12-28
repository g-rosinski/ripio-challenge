import React from "react"
import { TransferTransaction } from "../../../models/Transfer"
import { format } from "fecha"
import { TransferTicketContainer } from "./TransferTicket.styles"
import { currencyFormat } from "../../../shared/formatter"
import { LabellyRecord } from "../../molecules/LabellyRecord/LabellyRecord.component"

export type TransferTicketProps = TransferTransaction

export const TransferTicket: React.FC<TransferTicketProps> = ({
    emiter,
    receptor,
    currency,
    amount,
    transfer_date,
    status
}) => (
    <TransferTicketContainer>
        <LabellyRecord 
            label="Se transfirió" 
            value={`${currency} ${currencyFormat(amount)}`} 
        />
        <LabellyRecord 
            label="Desde la cuenta" 
            value={emiter} 
        />
        <LabellyRecord 
            label="A la cuenta" 
            value={receptor} 
        />
        <LabellyRecord 
            label="Fecha" 
            value={format(transfer_date,'DD/MM/YYYY  HH:mm')} 
        />
        <LabellyRecord 
            label="Estado de la transferencia" 
            value={status} 
            displayDivider={false}
        />
    </TransferTicketContainer>
)
