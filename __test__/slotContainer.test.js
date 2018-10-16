import {SlotContainerComponent} from "../src/view/slotContainer"
import React from 'react';
import {shallow} from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { rollerData } from '../src/resources/data/data';
import * as constants from "../src/utils/constants";
// // Create the mock store
// import configureMockStore from 'redux-mock-store';
// const mockStore = configureMockStore();

function setup(props){
    const wrapper = shallow(<SlotContainerComponent {...props} />);
    return {
        props,
        wrapper
    }
}

const mockOnStartSpin = jest.fn();
const mockOnStopSpin = jest.fn();

function generateRandomSlotItem() {
    return Math.floor(Math.random() * ( constants.numberOfSlotElement - 1 + 1)) + 1;
}

describe("tests for slot container component", () => {
    it("Should load properly for for initial load", ()=>{
        const { wrapper } = setup({
            rollerData: null,
            rollers: [],
            spinningFlag: false,
            waitToSpinChannel: null,
            spinChannel: null,
            stopChannel: null,
            result: false
        });
        expect(shallowToJson(wrapper)).toMatchSnapshot("test for initial load");
    });
    it("Should load properly for rollers(wheels) data on page load", () => {
        const { wrapper } = setup({
            rollers: [  rollerData[generateRandomSlotItem()-1],
                        rollerData[generateRandomSlotItem()-1],
                        rollerData[generateRandomSlotItem()-1]
                    ],
            spinning: false,
            result: false
        });
        expect(shallowToJson(wrapper)).toMatchSnapshot("test for rollers(wheels) data on page load");
    });
    it("Should load properly for rollers(wheels) spinning", () => {
        const { wrapper } = setup({
            rollers: [  rollerData[generateRandomSlotItem()-1],
                rollerData[generateRandomSlotItem()-1],
                rollerData[generateRandomSlotItem()-1]
            ],
            spinning: true,
            result: false
        });
        expect(shallowToJson(wrapper)).toMatchSnapshot("test for rollers(wheels) spinning");
    });
    it("Should load properly for showing result", () => {
        const { wrapper } = setup({
            rollers: [  rollerData[generateRandomSlotItem()-1],
                rollerData[generateRandomSlotItem()-1],
                rollerData[generateRandomSlotItem()-1]
            ],
            spinning: false,
            result: "you won $20"
        });
        expect(shallowToJson(wrapper)).toMatchSnapshot("test for showing result");
    });
    it('should call method passed to OnstartSpin on clicking the start button', ()=> {
        const { wrapper } = setup({
            rollers: [  rollerData[generateRandomSlotItem()-1],
                rollerData[generateRandomSlotItem()-1],
                rollerData[generateRandomSlotItem()-1]
            ],
            spinning: false,
            result: true,
            onStart: mockOnStartSpin
        });
        wrapper.find("#startBtn").simulate('click');
        expect(mockOnStartSpin).toHaveBeenCalledWith();
    });
    it('should call method passed to OnstopSpin on clicking the stop button', ()=> {
        const { wrapper } = setup({
            rollers: [  rollerData[generateRandomSlotItem()-1],
                rollerData[generateRandomSlotItem()-1],
                rollerData[generateRandomSlotItem()-1]
            ],
            spinning: true,
            result: false,
            onStop: mockOnStopSpin
        });
        wrapper.find("#stopBtn").simulate('click');
        expect(mockOnStopSpin).toHaveBeenCalledWith();
    });
});