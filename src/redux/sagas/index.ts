import { all, fork } from "redux-saga/effects";
import balanceSaga from "./balance.saga";
import transferSaga from "./transfer.saga";

export default function* sagas() {
    yield all([
        fork(transferSaga),
        fork(balanceSaga)
    ])
}