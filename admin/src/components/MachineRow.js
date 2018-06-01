import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MachineSlot from './MachineSlot'

class MachineRow extends Component {
  renderSlot() {
    const { row } = this.props;

    return row.slots.map((slot) => <MachineSlot key={slot.position} slot={slot}/>);
  }

  addSlot() {
    let { row, handleAddSlot } = this.props;
    let slot = {
      label: 'A23',
      product: 'object',
      stock: 0,
      position: row.slots.length + 1
    };
    row.slots.push(slot);
    handleAddSlot(row);
  }

  render() {
    return (
      <div className="rowItem">
        <span className="slotItem add" onClick={() => this.addSlot()}>
          +
        </span>
        {
          this.renderSlot()
        }
      </div>
    );
  }
}

MachineRow.propTypes = {
  row: PropTypes.object.isRequired,
  handleAddSlot: PropTypes.func.isRequired
};

export default MachineRow;
