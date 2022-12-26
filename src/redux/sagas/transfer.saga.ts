import { PayloadAction } from '@reduxjs/toolkit'
import { put, takeEvery, call } from 'redux-saga/effects'
import { Transfer, TransferTransaction } from '../../models/Transfer'
import { postTransfer } from '../../services/transferService'
import { newTransfer } from '../slices/transferHistorySlice'


function* handleTransferTransaction(action: PayloadAction<Transfer>){
    const response: TransferTransaction = yield call(postTransfer, action.payload)
    yield put(newTransfer(response))
    yield put({type: 'TRANSFER_DONE', payload: response})
}

function* transferSaga(){
    yield takeEvery('TRANSFER_REQUESTED', handleTransferTransaction)
}

export default transferSaga