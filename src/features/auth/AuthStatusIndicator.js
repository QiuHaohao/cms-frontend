import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Link } from "react-router-dom";

import { isLoggedIn, getUsername } from '../auth/redux/selectors'

import { Modal } from 'antd'

const confirm = Modal.confirm;

export class AuthStatusIndicator extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor() {
    super()
    this.showConfirm = this.showConfirm.bind(this)
  }

  showConfirm(onLogout) {
    console.log(this)
    confirm({
      title: 'Do you really want to Logout?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        onLogout()
      },
      onCancel() {
      },
    });
  }

  get logoutDiv() {
    return this.props.loggedIn
      ? <div className="auth-auth-status-indicator-logout"
          onClick={() => this.showConfirm(this.props.actions.actionLogout)}>Logout</div>
      : null
  }

  get indicatorText() {
    return this.props.loggedIn
      ? "Hi, " + this.props.username
      : "You are not logged in!"
  }

  render() {
    return (
      <div className="auth-auth-status-indicator">
        { this.indicatorText }
        { this.logoutDiv }
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    auth: state.auth,
    loggedIn: isLoggedIn(state),
    username: getUsername(state)
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
)(AuthStatusIndicator);
