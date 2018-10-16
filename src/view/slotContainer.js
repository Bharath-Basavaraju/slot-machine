import React from 'react';
import { connect } from 'react-redux';
import * as slotContainerStyles from '../resources/css/slotContainer.scss';
import RollerComponent from './roller';
import * as actions from '../actions/slotActions';

export class SlotContainerComponent extends React.Component {
    constructor(props) {
        super(props);
        //this.props.setSlotElements();
        //this.props.waitToStartSpin();
    }

    render() {
        const rollers = [];
        this.props.rollers.forEach((element, index) => {
            rollers.push(
                <RollerComponent key={index} elementData={element} />
            );
        });
        return (
            <div className={slotContainerStyles.slotMachine}>
                <div className={slotContainerStyles.slotWrapper}>
                    { rollers }
                </div>
                <div className={slotContainerStyles.btnContainer}>
                    <button id={"startBtn"}
                        className={slotContainerStyles.defaultBtn +" "+ (this.props.spinning ? slotContainerStyles.disabled : '')}
                        onClick={this.props.onStart}
                        disabled={this.props.spinning}>
                        Start
                    </button>
                    <button id={"stopBtn"}
                        className={slotContainerStyles.defaultBtn +" "+ (!this.props.spinning ? slotContainerStyles.disabled : '')}
                        onClick={this.props.onStop}
                        disabled={!this.props.spinning}>
                        Stop
                    </button>
                </div>
                { this.props.result
                    ?   <div className={slotContainerStyles.resultContainer}>
                            {this.props.result}
                        </div>
                    : null
                }
            </div>
        );
    }
}
export default connect(
    (store, ownProps)=>{
        return{
            slotMachine : store,
            rollers: store.get("rollers"),
            spinning: store.get("spinningFlag"),
            result: store.get("result"),
            ...ownProps
        }
    },
    (dispatch)=>{
        return{
            /*setSlotElements: () => {
              dispatch(actions.setSlotElements());
            },
            waitToStartSpin: () => {
              dispatch(actions.waitToStartSpin());
            },*/
            onStart: () => {
                dispatch(actions.startSpin());
            },
            onStop: () => {
                dispatch(actions.stopSpinning());
            }
        }
    }
)(SlotContainerComponent);