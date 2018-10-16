import {Map} from "immutable"
import RollerComponent from "../src/view/roller";
import React from 'react';
import {shallow} from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

function setup(props){
    const wrapper = shallow(<RollerComponent {...props} />);
    return {
        props,
        wrapper
    }
}

describe("tests for Roller (wheel) component", () => {
    it("Should load properly for roller(wheel) data when there's no backgroundPosition", () => {
        const elementParams = {
            "elementData": {
                "name": 'orange',
                "id": "2"
            }
        };
        const { wrapper } = setup(elementParams);
        expect(shallowToJson(wrapper)).toMatchSnapshot("test for backgroundPosition is missing");
    });
    it("Should load properly for roller(wheel) element data", () => {
        const elementParams = {
            "elementData": {
                "name": 'orange',
                "id": "2",
                "backgroundPosition": "-0 -200px"
            }
        };
        const { wrapper } = setup(elementParams);
        expect(shallowToJson(wrapper)).toMatchSnapshot("test for backgroundPosition is present in element data");
    });
});