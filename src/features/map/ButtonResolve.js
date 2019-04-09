import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import { Button } from 'antd';

export class ButtonResolve extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    map: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  resolve() {
    this.props.actions.actionResolveIncident(this.props.id)
  }

  render() {
    return (
      <Button type="primary" onClick={() => this.resolve()}>
          Resolve
      </Button>
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
)(ButtonResolve);
