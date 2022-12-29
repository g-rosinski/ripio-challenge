import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CURRENCY_LIST } from "../../mocks/crypto-currencies"
import { Transfer } from "../../models/Transfer"

export interface TransferState {
    emiter: string,
    receptor: string,
    currency: string,
    amount: number | undefined,
}

export const initialState: TransferState = {
    emiter: '',
    receptor: '',
    currency: CURRENCY_LIST[0],
    amount: undefined,
}

export const transferSlice = createSlice({
    name: 'transfer',
    initialState,
    reducers: {
        setEmiter: (state, action: PayloadAction<string>) => {
            state.emiter = action.payload
        },
        setTransfer: (state, action: PayloadAction<Transfer>) => {
            state.receptor = action.payload.receptor
            state.currency = action.payload.currency
            state.amount = action.payload.amount
            state.emiter = action.payload.emiter
        },
        newTransfer: (state) => {
            state = initialState
        },
    }
})

export const {
    setEmiter,
    setTransfer,
    newTransfer
} = transferSlice.actions

export default transferSlice.reducer
