import React, { Component } from 'react';
import PropTypes from 'prop-types';


class MachineSlot extends Component {
render() {
    const { slot } = this.props;
    return (
      <span className="slotItem">
        <span>
          {slot.label}
        </span>
      </span>
    );
  }
}

MachineSlot.propTypes = {
  slot: PropTypes.object.isRequired
};

export default MachineSlot;
