import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { BalanceAction } from "../../models/Balance"

export interface BalanceHistoryState {
    history: BalanceAction[]
}

export const initialState: BalanceHistoryState = {
    history: [],
}

export const balanceHistorySlice = createSlice({
    name: 'balanceHistory',
    initialState,
    reducers: {
        updateBalance: (state, action: PayloadAction<BalanceAction>) => {
            state.history.push(action.payload)
        },
    }
})

export const {
    updateBalance
} = balanceHistorySlice.actions

export default balanceHistorySlice.reducer