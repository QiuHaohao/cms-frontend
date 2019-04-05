import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Map from "./Map";
import Crisis from "./Crisis";

export class CrisisMap extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    size: PropTypes.object.isRequired,
    defaultZoom: PropTypes.number,
  };

  defaultProps = {
    defaultZoom: 11
  }

  renderCrisis() {
    return this.props.data.map(
      (datum, index) => <Crisis key={index} {...datum}/>
    )
  }

  render() {
    const MapWithSize = Map(this.props.size, this.props.defaultZoom)
    return this.props.data.length
      ? (
        <div className="map-crisis-map">
            <MapWithSize> { this.renderCrisis() } </MapWithSize>
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
