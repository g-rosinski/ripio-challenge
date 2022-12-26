import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CURRENCY_LIST } from "../../mocks/crypto-currencies"

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

type TransferActionPayload = {
    receptor: string,
    currency: string,
    amount: number
}

export const transferSlice = createSlice({
    name: 'transfer',
    initialState,
    reducers: {
        setEmiter: (state, action: PayloadAction<string>) => {
            state.emiter = action.payload
        },
        setTransfer: (state, action: PayloadAction<TransferActionPayload>) => {
            state.receptor = action.payload.receptor
            state.currency = action.payload.currency
            state.amount = action.payload.amount
        },
        newTransfer: (state) => {
            state.receptor = initialState.receptor
            state.currency = initialState.currency
            state.amount = initialState.amount
        },
    }
})

export const {
    setEmiter,
    setTransfer,
    newTransfer
} = transferSlice.actions

export default transferSlice.reducer
