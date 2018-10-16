import * as ActionNames from "../utils/actionNames";

export function setRollerData(rollerData) {
    return{
        type : ActionNames.SET_ROLLER_DATA,
        rollerData
    }
}

export function setSlotElements(){
    return{
        type : ActionNames.SET_SLOT_ELEMENT
    }
}

export function waitToStartSpin() {
    return {
        type: ActionNames.WAIT_TO_START_SPIN
    }
}
export function startSpin() {
    return{
        type: ActionNames.START_SPIN
    }
}

export function setWaitToSpinData(spinningFlag, waitToSpinChannel) {
    return{
        type: ActionNames.SET_WAIT_TO_SPIN,
        spinningFlag,
        waitToSpinChannel
    }
}

export function setSpinningData(spinningFlag, spinChannel) {
    return{
        type: ActionNames.SET_SPINNING,
        spinningFlag,
        spinChannel
    }
}

export function spinningStarted() {
    return{
        type: ActionNames.SPINNING_STARTED
    }
}

export function setStopSpinningData(stopSpinChannel) {
    return{
        type: ActionNames.SET_STOP_SPINNING,
        stopSpinChannel
    }
}

export function stopSpinning() {
    return{
        type: ActionNames.STOP_SPINNING
    }
}

export function spinningStopped() {
    return{
        type: ActionNames.SPINNING_STOPPED
    }
}