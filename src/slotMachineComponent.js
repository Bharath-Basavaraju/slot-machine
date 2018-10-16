import React from 'react';
import { Provider } from 'react-redux';
import 'regenerator-runtime/runtime'
import { createStore, applyMiddleware } from 'redux';
import CreateSagaMiddleware from 'redux-saga';
import { SlotMachineReducer } from  './reducers/slotMachineReducer';
import slotMachineSagas from './sagas/slotMachineSagas';
import SlotContainerComponent from './view/slotContainer';
import { rollerData } from './resources/data/data';
import * as actions from './actions/slotActions';

const sagaMiddleware = CreateSagaMiddleware();
let store = createStore(SlotMachineReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(slotMachineSagas);
const title = "Slot Machine Game",
    errorMsg = "Sorry, we are trying to get back. Try after sometime !";

export default class SlotMachineComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = { hasError: false };
        store.dispatch(actions.setRollerData(rollerData));
        store.dispatch(actions.setSlotElements());
        store.dispatch(actions.waitToStartSpin());
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
    }

    render(){
        return(
            this.state.hasError ?
                <h3>{errorMsg}</h3>
            :   <div>
                    <h1>{title}</h1>
                    <Provider store={store}>
                        <SlotContainerComponent {...this.props} />
                    </Provider>
                </div>
        )
    }
}