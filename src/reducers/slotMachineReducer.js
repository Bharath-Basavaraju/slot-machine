import {Map} from "immutable";
import * as helperFnc from "../utils/helperFunction";
import * as ActionNames from '../utils/actionNames';
import * as constants from '../utils/constants';

const initialState = Map({
    rollerData: null,
    rollers: [],
    spinningFlag: false,
    waitToSpinChannel: null,
    spinChannel: null,
    stopChannel: null,
    result: false
});

export function SlotMachineReducer(state = initialState, action){
    switch(action.type){
        case ActionNames.SET_ROLLER_DATA: {
            return state.set("rollerData", action.rollerData);

        }
        case ActionNames.SET_SLOT_ELEMENT : {
                    let rollers = [],
                        rollerData = state.get("rollerData");
                    for(let i=0; i<constants.numberOfRoller; i++){
                        rollers.push(rollerData[helperFnc.generateRandomSlotItem() - 1]);
                    }
                    return state.set("rollers", rollers);
        }
        case ActionNames.SET_WAIT_TO_SPIN : {
            return state.set("spinningFlag", action.spinningFlag).set("waitToSpinChannel", action.waitToSpinChannel);
        }
        case ActionNames.SET_SPINNING : {
            let getWaitToSpinChannel = state.get("waitToSpinChannel");
            if(getWaitToSpinChannel){
                getWaitToSpinChannel.close();
            }
            return state.set("spinningFlag", action.spinningFlag).set("spinChannel", action.spinChannel).set("waitToSpinChannel", null).set("result", false);
        }
        case ActionNames.SET_STOP_SPINNING: {
            return state.set("stopChannel", action.stopSpinChannel);
        }
        case ActionNames.SPINNING_STOPPED: {
            let getSpinChannel = state.get("spinChannel");
            let getStopChannel = state.get("stopChannel");
            let result = helperFnc.getResult(state.get("rollers"));
            if(getSpinChannel){
                getSpinChannel.close();
            }
            if(getStopChannel){
                getStopChannel.close();
            }
            return state.set("spinningFlag", false).set("spinChannel", null).set("stopChannel",null).set("result", result);
        }
    }
    return state;
}