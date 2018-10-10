import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import slotMachineSagas from './sagas/slotMachineSagas';

const sagaMiddleware = createSagaMiddleware();
let store = createStore(combineReducers({

            }), applyMiddleware(sagaMiddleware));
//sagaMiddleware.run(slotMachineSagas);
const title = "Slot Machine Game";

export default class SlotMachineComponet extends React.Component{
    render(){
        return(
            <Provider store={store}>
                <div>{title}</div>
            </Provider>
        )
    }
}