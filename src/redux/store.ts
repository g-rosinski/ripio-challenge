import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import createSagaMiddleware from 'redux-saga'
import sagas from "./sagas";
import balanceHistorySlice from "./slices/balanceHistorySlice";
import transferHistorySlice from "./slices/transferHistorySlice";
import balanceSlice from "./slices/balanceSlice";
import transferSlice from "./slices/transferSlice";

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer: {
        transfer: transferSlice,
        balance: balanceSlice,
        transferHistory: transferHistorySlice,
        balanceHistory: balanceHistorySlice
    },
    middleware: [
        sagaMiddleware,
        // (getDefaultMiddleware) => getDefaultMiddleware()
    ]
})

sagaMiddleware.run(sagas)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store