import React from "react";
import * as slotRowStyles from '../resources/css/roller.scss';

export default class RollerComponent extends React.Component {
    render() {
        let slotData = this.props.elementData;
        return (
            <div className={slotRowStyles.slotRow} style={{backgroundPosition: slotData.backgroundPosition ? slotData.backgroundPosition : "0 0"}}></div>
        );
    }
}