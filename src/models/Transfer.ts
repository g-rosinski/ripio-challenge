export type Transfer = {
    emiter: string,
    receptor: string,
    currency: string,
    amount: number,
}
export type TransferTransaction = Transfer & {
    transfer_date: Date,
    status: 'COMPLETED' | 'PENDING'
}