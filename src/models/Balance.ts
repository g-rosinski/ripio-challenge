export type BalanceAccount = {
    BTC: number, 
    ETH: number, 
    USDT: number, 
    DAI: number
}

export type BalanceAction = {
    action: 'DEBIT' | 'CREDIT'
    account: string,
    currency: string,
    amount: number,
    created_at: Date
}