import { SlotMachineReducer } from "../src/reducers/slotMachineReducer";
import * as slotActions from "../src/actions/slotActions";
import { rollerData } from "../src/resources/data/data";
import {Map} from "immutable";
import * as constants from "../src/utils/constants";
import * as helperFnc from "../src/utils/helperFunction";
import {eventChannel} from "redux-saga";

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

describe ('Slot Machine reducer', ()=>{
    it('should return the initial state', ()=>{
        const initialState = Map({
                                rollerData: null,
                                rollers: [],
                                spinningFlag: false,
                                waitToSpinChannel: null,
                                spinChannel: null,
                                stopChannel: null,
                                result: false
                            });
        expect(SlotMachineReducer(undefined, {})).toEqual(initialState);
    });
    it('should set roller data if roller data is passed', ()=>{
        expect(SlotMachineReducer(Map({}), slotActions.setRollerData(rollerData))).toEqual(Map({"rollerData": rollerData }));
    });
    it('should initialize the slot elements', ()=>{
        let rollers = [];
        for(let i=0; i < constants.numberOfRoller; i++){
            rollers.push(rollerData[helperFnc.generateRandomSlotItem() - 1]);
        }
        expect(SlotMachineReducer(Map({
                "rollerData": rollerData,
                "rollers": rollers
            }),
            slotActions.setSlotElements(rollerData))).toEqual(Map({
                "rollerData": rollerData,
                "rollers": rollers
            }));
    });
    it('should set the wait channel to wait to start spin', ()=>{
        const waitToSpinChannel = countEmitter(constants.defaultStartSpin);
        expect(SlotMachineReducer(Map({"spinningFlag":false, "waitToSpinChannel": waitToSpinChannel}),
            slotActions.setWaitToSpinData(false, waitToSpinChannel)))
            .toEqual(Map({"spinningFlag":false, "waitToSpinChannel": waitToSpinChannel}));
    });
    it('should set the state spinning emitter channel when spin starts', ()=>{
        const spinChannel = spinEmitter(constants.spinSpeed);
        expect(SlotMachineReducer(Map({
                "spinningFlag":true,
                "spinChannel": spinChannel,
                "waitToSpinChannel":null,
                "result": false
            }),
            slotActions.setSpinningData(true, spinChannel))).toEqual(
                Map({
                    "spinningFlag":true,
                    "spinChannel": spinChannel,
                    "waitToSpinChannel":null,
                    "result": false
                }));
    });
    it('should set the spinning stop channel after spin start', ()=>{
        const stopSpinChannel = countEmitter(constants.defaultStopSpin);
        expect(SlotMachineReducer(Map({"stopChannel": stopSpinChannel}),
            slotActions.setStopSpinningData(stopSpinChannel))).toEqual(Map({"stopChannel": stopSpinChannel}));
    });
    it('should set the state after spinning stop and set result to first prize', ()=>{
        let rollers  =    [{
                                id: 'orange',
                                backgroundPosition: '-0 -200px'
                            },
                            {
                                id: 'orange',
                                backgroundPosition: '-0 -200px'
                            },
                            {
                                id: 'orange',
                                backgroundPosition: '-0 -200px'
                            }];
        let result = helperFnc.getResult(rollers);
        expect(SlotMachineReducer(Map({
                "rollers": rollers,
                "spinningFlag":false,
                "spinChannel": null,
                "stopChannel": null,
                "result": constants.firstPrize
            }),
            slotActions.spinningStopped())).toEqual(
            Map({
                "rollers": rollers,
                "spinningFlag": false,
                "spinChannel": null,
                "stopChannel": null,
                "result": result
            }));
    });
    it('should set the state after spinning stop and set result to second prize', ()=>{
        const spinChannel = spinEmitter(constants.spinSpeed);
        let rollers = [{
                            id: 'strawberry',
                            backgroundPosition: '-0 -0'
                        },
                        {
                            id: 'monkey',
                            backgroundPosition: '-0 -300px'
                        },
                        {
                            id: 'monkey',
                            backgroundPosition: '-0 -300px'
                        }];
        let result = helperFnc.getResult(rollers);
        expect(SlotMachineReducer(Map({
                "rollers": rollers,
                "spinningFlag":false,
                "spinChannel": spinChannel,
                "stopChannel": null,
                "result": constants.secondPrize
            }),
            slotActions.spinningStopped())).toEqual(
            Map({
                "rollers": rollers,
                "spinningFlag":false,
                "spinChannel": spinChannel,
                "stopChannel": null,
                "result": result
            }));
    });
    it('should set the state after spinning stop and set result to third prize', ()=>{
        const spinChannel = spinEmitter(constants.spinSpeed);
        const stopSpinChannel = countEmitter(constants.defaultStopSpin);
        let rollers= [{
                        id: 'strawberry',
                        backgroundPosition: '-0 -0'
                        },
                        {
                            id: 'monkey',
                            backgroundPosition: '-0 -300px'
                        },
                        {
                            id: 'strawberry',
                            backgroundPosition: '-0 -0'
                    }];
        let result = helperFnc.getResult(rollers);
        expect(SlotMachineReducer(Map({
                "rollers": rollers,
                "spinningFlag":false,
                "spinChannel": null,
                "stopChannel": null,
                "result": constants.thirdPrize
            }),
            slotActions.spinningStopped())).toEqual(
            Map({
                "rollers": rollers,
                "spinningFlag":false,
                "spinChannel": null,
                "stopChannel": null,
                "result": result
            }));
    });
    it('should set the state after spinning stop and set result to lost', ()=>{
        const stopSpinChannel = countEmitter(constants.defaultStopSpin);
        let rollers =  [{
                            id: 'banana',
                            backgroundPosition: '-0 -100px'
                        },
                        {
                            id: 'monkey',
                            backgroundPosition: '-0 -300px'
                        },
                        {
                            id: 'orange',
                            backgroundPosition: '-0 -200px'
                        }];
        let result = helperFnc.getResult(rollers);
        expect(SlotMachineReducer(Map({
                "rollers": rollers,
                "spinningFlag":false,
                "spinChannel": null,
                "stopChannel": stopSpinChannel,
                "result": constants.lostMsg
            }),
            slotActions.spinningStopped())).toEqual(
            Map({
                "rollers": rollers,
                "spinningFlag":false,
                "spinChannel": null,
                "stopChannel": stopSpinChannel,
                "result": result
            }));
    });
});