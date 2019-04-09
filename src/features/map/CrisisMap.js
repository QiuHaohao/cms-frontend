import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Map from "./Map";
import Crisis from "./Crisis";

const _ = require('lodash')

export class CrisisMap extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    size: PropTypes.object.isRequired,
    defaultZoom: PropTypes.number,
    preview: PropTypes.bool,

  };

  defaultProps = {
    defaultZoom: 11,
    preview: false,
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    if (_.isEqual(nextProps.data, this.props.data)) {
      return false
    } else {
      return true
    }
  }

  renderCrisis() {
    return _.map(
      this.props.data,
      (datum, index) => <Crisis key={index} preview={this.props.preview} {...datum}/>
    )
  }

  render() {
    const MapWithSize = Map(this.props.size, this.props.defaultZoom)
    return Object.keys(this.props.data).length
      ? (
        <div className="map-crisis-map">
            <MapWithSize > { this.renderCrisis() } </MapWithSize>
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
