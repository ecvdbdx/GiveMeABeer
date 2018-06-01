import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MachineRow from './MachineRow'

class ConfigMachine extends Component {
  constructor(props) {
    super(props);

    this.state = {
      machine: props.machines[0]
    };
  }

  renderListMachine() {
    const { machines } = this.props;

    return machines.map((machine) => <span onClick={() => this.setState({machine})} key={machine.id}>{machine.label}</span>);
  }

  renderMachine() {
    const { machine } = this.state;

    return (
      <div className="item">
        <span className="title">
          {machine.label}
        </span>
        <div className="listField">
          <div>
            <input type="text" name="label" value={machine.label} onChange={(event) => this.setState({machine: {...machine, label: event.target.value}})}/>
          </div>
          <div>
            <input type="text" name="addressPoint" value={machine.addressPoint} onChange={(event) => this.setState({machine: {...machine, addressPoint: event.target.value}})}/>
          </div>
        </div>
        <div className="listRow">
          {
            this.renderMachineRow()
          }
          <div className="rowItem add" onClick={() => this.handleAddRack()}>
            Ajouter un rack
          </div>
        </div>
      </div>
    );
  }

  renderMachineRow() {
    const { machine } = this.state;

    return machine.rows.map((row) => <MachineRow key={row.position} row={row}/>);
  }

  handleEditMachine() {
    const { machine } = this.state;

    console.log(machine);
  }


  render() {
    return (
      <div>
        <span className="title">
          Configuration machine
        </span>
        <div className="listFilter">
          {
            this.renderListMachine()
          }
        </div>
          {
            this.renderMachine()
          }
          <button onClick={() => this.handleEditMachine()}>
            Modifier
          </button>
      </div>
    );
  }
}

ConfigMachine.propTypes = {
  machines: PropTypes.array.isRequired
};

export default ConfigMachine;
