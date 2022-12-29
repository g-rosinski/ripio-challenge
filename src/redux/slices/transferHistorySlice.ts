import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TransferTransaction } from "../../models/Transfer"

export interface TransferHistoryState {
    history: TransferTransaction[]
}

export const initialState: TransferHistoryState = {
    history: [],
}

export const transferHistorySlice = createSlice({
    name: 'transferHistory',
    initialState,
    reducers: {
        newTransfer: (state, action: PayloadAction<TransferTransaction>) => {
            state.history.push({ ...action.payload})
        },
    }
})

export const {
    newTransfer
} = transferHistorySlice.actions

export default transferHistorySlice.reducer