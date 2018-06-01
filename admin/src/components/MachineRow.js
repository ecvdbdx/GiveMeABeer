import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MachineSlot from './MachineSlot'

class MachineRow extends Component {
  constructor(props) {
    super(props);

  }


  renderSlot() {
    const { row } = this.props;

    return row.slots.map((slot) => <MachineSlot key={slot.position} slot={slot}/>);
  }

  render() {
    const { row } = this.props;
    return (
      <div className="rowItem">
        {
          this.renderSlot()
        }
        <span className="slotItem add">
          +
        </span>
      </div>
    );
  }
}

MachineRow.propTypes = {
  row: PropTypes.object.isRequired
};

export default MachineRow;
