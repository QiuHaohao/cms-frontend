import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import CrisisStatistics from './CrisisStatistics'
import CrisisMap from './CrisisMap'
import CrisisList from './CrisisList'


export class PageCrisisMap extends Component {
  static propTypes = {
    map: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.dataFetchInterval = setInterval(
      () => {
        this.props.actions.actionFetchData()
      }
    , 100000)
    this.props.actions.actionFetchData()
  }

  componentWillUnmount() {
    clearInterval(this.dataFetchInterval)
  }

  get data() {
    return this.props.map.data
  }

  render() {
    return (
      <div className="map-page-crisis-map">
        <CrisisStatistics data={this.data}/>
        <CrisisMap data={this.data} size={{ height: "600px" }}/>
        <CrisisList data={this.data}/>
      </div>
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
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageCrisisMap);
