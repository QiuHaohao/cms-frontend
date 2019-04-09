import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import { Button } from 'antd';

import { getIdBeingResolved, getIdBeingDeleted } from './redux/selectors'


export class ButtonDelete extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    map: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  delete() {
    this.props.actions.actionDeleteIncident(this.props.id)
  }

  get isDeleting() {
    return this.props.idBeingDeleted && this.props.idBeingDeleted === this.props.id
  }

  get isResolving() {
    return this.props.idBeingResolved && this.props.idBeingResolved === this.props.id
  }

  get isDeleted() {
    return this.props.map.data[this.props.id].resolved_status === "deleted"
  }

  get disabled() {
    return this.isDeleted || this.isResolving
  }

  render() {
    return (
      <Button 
        type="danger" 
        onClick={() => this.delete()}
        loading={this.isDeleting}
        disabled={this.disabled}>
          { this.isDeleted ? "Deleted" : "Delete"}
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
)(ButtonDelete);
