import * as actions from "../src/actions/slotActions";
import * as actionNames from "../src/utils/actionNames";
import { rollerData } from "../src/resources/data/data";
import * as constants from "../src/utils/constants";
import {eventChannel, END} from "redux-saga";

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

describe('Verifying slot machine actions', () => {
    it('should create an action to set Roller Data', () => {
        const expectedAction = {
            type: actionNames.SET_ROLLER_DATA,
            rollerData
        };
        expect(actions.setRollerData(rollerData)).toEqual(expectedAction);
    });
    it('should create an action to set slot element', () => {
        const expectedAction = {
            type: actionNames.SET_SLOT_ELEMENT
        };
        expect(actions.setSlotElements()).toEqual(expectedAction);
    });
    it('should create an action to wait time to start spin', () => {
        const expectedAction = {
            type: actionNames.WAIT_TO_START_SPIN
        };
        expect(actions.waitToStartSpin()).toEqual(expectedAction);
    });
    it('should create an action to start the spin', () => {
        const expectedAction = {
            type: actionNames.START_SPIN
        };
        expect(actions.startSpin()).toEqual(expectedAction);
    });
    it('should create an action to set wait channel to start spin', () => {
        const waitToSpinChannel = countEmitter(constants.defaultStartSpin);
        const spinning = false;
        const expectedAction = {
            type: actionNames.SET_WAIT_TO_SPIN,
            spinningFlag: spinning,
            waitToSpinChannel:waitToSpinChannel
        };
        expect(actions.setWaitToSpinData(spinning,waitToSpinChannel)).toEqual(expectedAction);
    });
    it('should create an action to set spinning channel emitter', () => {
        const spinChannel = spinEmitter(constants.spinSpeed);
        const spinning = true;
        const expectedAction = {
            type: actionNames.SET_SPINNING,
            spinningFlag: spinning,
            spinChannel: spinChannel
        };
        expect(actions.setSpinningData(spinning,spinChannel)).toEqual(expectedAction);
    });
    it('should create an action to set spinning started', () => {
        const expectedAction = {
            type: actionNames.SPINNING_STARTED
        };
        expect(actions.spinningStarted()).toEqual(expectedAction);
    });
    it('should create an action to set stop spinning channel emitter', () => {
        const stopSpinChannel = countEmitter(constants.defaultStopSpin);
        const expectedAction = {
            type: actionNames.SET_STOP_SPINNING,
            stopSpinChannel: stopSpinChannel
        };
        expect(actions.setStopSpinningData(stopSpinChannel)).toEqual(expectedAction);
    });
    it('should create an action to trigger stop spinning', () => {
        const expectedAction = {
            type: actionNames.STOP_SPINNING
        };
        expect(actions.stopSpinning()).toEqual(expectedAction)
    });
    it('should create an action to set spinning has stopped', () => {
        const expectedAction = {
            type: actionNames.SPINNING_STOPPED
        };
        expect(actions.spinningStopped()).toEqual(expectedAction)
    });
});