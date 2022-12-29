import { Transfer, TransferTransaction } from "../models/Transfer";

export const postTransfer = (data:Transfer): TransferTransaction => {

    const response: TransferTransaction = {
        ...data, 
        transfer_date: new Date(Date.now()),
        status: data.amount >= 1000 ? 'PENDING' : 'COMPLETED'
    }
    return response
}