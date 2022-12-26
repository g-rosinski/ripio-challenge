import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface BalanceState {
    balance: {[currency:string]: number}
}

export const initialState: BalanceState = {
    balance: {},
}

export const balanceSlice = createSlice({
    name: 'balance',
    initialState,
    reducers: {
        setBalance: (state, action: PayloadAction<{[currency:string]: number}>) => {
            state.balance = action.payload
        },
        debitBalance: (state, action: PayloadAction<{currency: string, amount: number}>) => {
            const founds = state.balance[action.payload.currency]
            if(!!founds){
                state.balance[action.payload.currency] = founds - action.payload.amount
            }
        }
    },
})

export const { 
    setBalance,
    debitBalance
} = balanceSlice.actions

export default balanceSlice.reducer