import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Map from "./Map";
import Crisis from "./Crisis";
import CrisisStatistics from './CrisisStatistics'
import CrisisList from './CrisisList'

export class CrisisMap extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  renderCrisis() {
    return this.props.data.map(
      (datum, index) => <Crisis key={index} {...datum}/>
    )
  }

  render() {
    return this.props.data.length
      ? (
        <div className="map-crisis-map">
            <Map> { this.renderCrisis() } </Map>
        </div>
      )
      : (
        <div className="map-crisis-map">
          <p>Loading</p>
        </div>
      )
  }
}

export default CrisisMap;
