import React, { Component } from 'react';

import { Menu } from 'antd';

import AuthStatusIndicator from '../auth/AuthStatusIndicator'

import {
  withRouter
} from 'react-router-dom'

class PageHeader extends Component {
  static propTypes = {

  };

  getOnClickForTab(path) {
    return () => {
      this.props.history.push(path)
    }
  }

  render() {
    return (
      <div className="common-page-header">
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1" onClick={this.getOnClickForTab('/crisis-map')}>Incidents Monitor</Menu.Item>
          <Menu.Item key="2" onClick={this.getOnClickForTab('/report-crisis')}>Report Incident</Menu.Item>
        </Menu>
        <AuthStatusIndicator />
      </div>
    );
  }
}

export default withRouter(PageHeader)