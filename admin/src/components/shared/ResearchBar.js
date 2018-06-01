import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state
  }

  render() {
    return (
    <div>
        <input placeholder={this.props.placeholder}></input>
    </div>
    );
  }
}

SearchBar.propTypes = {

};

export default SearchBar;
