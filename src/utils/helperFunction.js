import * as constants from './constants';

export function generateRandomSlotItem() {
    return Math.floor(Math.random() * ( constants.numberOfSlotElement - 1 + 1)) + 1;
}

export function getResult(rollers){
    if(rollers[0].id === rollers[1].id && rollers[1].name === rollers[2].id){
        return constants.firstPrize;
    }
    else if(rollers[0].id === rollers[1].id || rollers[1].name === rollers[2].id){
        return constants.secondPrize;
    }
    else if(rollers[0].id === rollers[2].id){
        return constants.thirdPrize;
    }
    else{
        return constants.lostMsg;
    }
}

