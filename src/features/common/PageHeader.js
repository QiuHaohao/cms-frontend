import React, { Component } from 'react';

import { Menu } from 'antd';

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
      <React.Fragment>
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1" onClick={this.getOnClickForTab('/crisis-map')}>Incidents Monitor</Menu.Item>
          <Menu.Item key="2" onClick={this.getOnClickForTab('/report-crisis')}>Report Incident</Menu.Item>
        </Menu>
      </React.Fragment>
    );
  }
}

export default withRouter(PageHeader)