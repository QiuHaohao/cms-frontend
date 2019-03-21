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
    this.props.actions.actionFetchData()
  }

  renderCrisis() {
    console.log(this.props.map.data)
    return this.props.map.data.map(
      (datum, index) => <Crisis key={index}{...datum}/>
    )
  }

  render() {
    return (
      <Map>
        { this.renderCrisis() }
      </Map>
    );
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
