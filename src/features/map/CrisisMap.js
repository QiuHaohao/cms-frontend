import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import Map from "./Map";
import Crisis from "./Crisis";

export class CrisisMap extends Component {
  static propTypes = {
    map: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.dataFetchInterval = setInterval(
      () => {
        this.props.actions.actionFetchData()
      }
    , 10000)
    this.props.actions.actionFetchData()
  }

  componentWillUnmount() {
    this.props.actions.actionFetchData()
    clearInterval(this.dataFetchInterval)
  }

  renderCrisis() {
    return this.props.map.data.map(
      (datum, index) => <Crisis key={index} {...datum}/>
    )
  }

  render() {
    return this.props.map.data.length
      ? (
        <div className="map-crisis-map">
          <Map>
            { this.renderCrisis() }
          </Map>
        </div>
      )
      : (
        <div className="map-crisis-map">
          <p>Loading</p>
        </div>
      )
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    map: state.map,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CrisisMap);
