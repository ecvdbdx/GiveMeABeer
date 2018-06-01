import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom'

import './../styles/App.css';

class Navigation extends Component {
  render() {
    return (
      <div className="sidebar">
        <nav>
          <span>
            <Link to="/">Home</Link>
          </span>
          <span>
            <Link to="/configMachine">Configuration machine</Link>
          </span>
          <span>
            <Link to="/produits">Produits</Link>
          </span>
        </nav>
      </div>
    );
  }
}

export default Navigation;
