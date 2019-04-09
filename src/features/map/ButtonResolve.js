import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import { Button } from 'antd';

import { getIdBeingResolved, getIdBeingDeleted } from './redux/selectors'

export class ButtonResolve extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    map: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  resolve() {
    this.props.actions.actionResolveIncident(this.props.id)
  }

  get isDeleting() {
    return this.props.idBeingDeleted && this.props.idBeingDeleted === this.props.id
  }

  get isResolving() {
    return this.props.idBeingResolved && this.props.idBeingResolved === this.props.id
  }

  get isResolved() {
    return this.props.map.data[this.props.id].resolved_status === "resolve"
  }

  get disabled() {
    return this.props.map.data[this.props.id].resolved_status !== "active"
      || this.isResolving
  }

  render() {
    return (
      <Button 
        type="primary" 
        onClick={() => this.resolve()}
        loading={this.isResolving}
        disabled={this.disabled}>
        { this.isResolved ? "Resolved" : "Resolve"}
      </Button>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    map: state.map,
   idBeingDeleted: getIdBeingDeleted(state),
    idBeingResolved: getIdBeingResolved(state),
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
)(ButtonResolve);
