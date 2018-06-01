import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import './styles/App.css';

import Navigation from './components/Navigation'
import ConfigMachine from './components/ConfigMachine'

class App extends Component {
  constructor(props) {
    super(props);
    this.machines = [{
      id: 1,
      label: 'Machine 1',
      addressPoint: 'https://192.168.1.134',
      rows: [{
        id: 1,
        position: 1,
        slots: [{
          label: 'A21',
          product: 'object',
          stock: 10,
          position: 1
        },
        {
          label: 'A22',
          product: 'object',
          stock: 5,
          position: 2
        }]
      },
      {
        id: 2,
        position: 2,
        slots: [{
          label: 'A23',
          product: 'object',
          stock: 10,
          position: 1
        }]
      }]
    },
    {
      id: 2,
      label: 'Machine 2',
      addressPoint: 'https://192.168.1.128',
      rows: [{
        id: 3,
        position: 2,
        slots: [{
          label: 'A21',
          product: 'object',
          stock: 10,
          position: 2
        }]
      }]
    }];
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div className="container">
            <Navigation />
          <div className="content">
              <Route exact path="/configMachine" render={(props) => (
                  <ConfigMachine {...props} machines={this.machines} />
                )}/>
            </div>
          </div>
        </Router>

      </div>
    );
  }
}

export default App;
