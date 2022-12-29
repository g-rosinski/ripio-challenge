import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeEvery } from 'redux-saga/effects'
import { TransferTransaction } from '../../models/Transfer'
import { User } from '../../models/User'
import { getUserData } from '../../services/userService'
import { updateBalance } from '../slices/balanceHistorySlice'
import { debitBalance, setBalance } from '../slices/balanceSlice'

function* handleFetchUserBalance(action: PayloadAction<string>){
    const loggedUsername = action.payload
    const userBalance: User | undefined = yield call(getUserData, loggedUsername)
    if(!!userBalance?.balance){
        yield put(setBalance(userBalance?.balance))
    }
}

function* handleTransferDone(action: PayloadAction<TransferTransaction>){
    const { emiter, receptor, transfer_date, ...transfer} = action.payload
    yield put(updateBalance({action: 'DEBIT', account: emiter, created_at: transfer_date, ...transfer}))
    yield put(updateBalance({action: 'CREDIT', account: receptor, created_at: transfer_date, ...transfer}))
    yield put(debitBalance({currency: transfer.currency, amount: transfer.amount!}))
}

function* balanceSaga(){
    yield takeEvery('FETCH_USER_BALANCE', handleFetchUserBalance);
    yield takeEvery('TRANSFER_DONE', handleTransferDone);
}

export default balanceSaga