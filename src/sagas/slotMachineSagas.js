import * as actionNames from "../utils/actionNames";
import { call, put, takeEvery, select , take} from "redux-saga/effects";
import * as slotActions from "../actions/slotActions";
import {eventChannel, END} from "redux-saga";
import * as constants from "../utils/constants"

const getSpinChannel = (state) => state.spinChannel;
const getStopSpinChannel = (state) => state.stopChannel;
const getWaitToSpinChannel = (state) => state.waitToSpinChannel;

const spinEmitter = (secs) => {
    return eventChannel(emitter => {
        setInterval(() => {
            emitter(true);
        }, secs);
        return () => {};
    })
};

const countEmitter = (secs) => {
    return eventChannel(emitter => {
        setTimeout(() => {
            emitter(true);
        }, secs);
        return () => {};
    })
};

function* startSpinning(action){
    const spinChannel = yield call(spinEmitter, constants.spinSpeed);
    let waitToSpinChannel = yield select(getWaitToSpinChannel);
    if(waitToSpinChannel) {
        waitToSpinChannel.close();
    }
    yield put(slotActions.setSpinningData(true,spinChannel));
    yield put(slotActions.spinningStarted());
    while (true) {
        const res = yield take(spinChannel);
        if(res) {
            yield put(slotActions.setSlotElements());
        }
    }
}

function* waitToSpin(action) {
    const waitToSpinChannel = yield call(countEmitter, constants.defaultStartSpin);
    yield put(slotActions.setWaitToSpinData(false, waitToSpinChannel));
    while (true) {
        const res = yield take(waitToSpinChannel);
        if(res) {
            if(waitToSpinChannel) {
                waitToSpinChannel.close();
            }
            yield put(slotActions.startSpin());
        }
    }
}

function* counterToStopSpin(action){
    const stopSpinChannel = yield call(countEmitter, constants.defaultStopSpin);
    yield put(slotActions.setStopSpinningData(stopSpinChannel));
    while (true) {
        const res = yield take(stopSpinChannel);
        if(res) {
            yield put(slotActions.stopSpinning());
        }
    }
}

function* clearChannel(){
    let spinChannel =  yield select(getSpinChannel);
    let stopChannel = yield select(getStopSpinChannel);
    if(spinChannel) {
        spinChannel.close();
    }
    if(stopChannel) {
        stopChannel.close();
    }
    yield put(slotActions.spinningStopped());
}

function* slotMachineSagas(){
    yield takeEvery(actionNames.START_SPIN, startSpinning);
    yield  takeEvery(actionNames.WAIT_TO_START_SPIN, waitToSpin);
    yield takeEvery(actionNames.SPINNING_STARTED, counterToStopSpin);
    yield takeEvery(actionNames.STOP_SPINNING, clearChannel);
}

export default slotMachineSagas;