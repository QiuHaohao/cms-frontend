import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { List } from 'antd';

export default class CrisisList extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  render() {
    return this.props.data.length !== 0
      ? <div className="map-crisis-list">
          <div className="map-crisis-list-header">
            List of Incidents
          </div>
            <List
              itemLayout="horizontal"
              dataSource={this.props.data}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={item.Type}
                    description={item.message_content}
                  />
                </List.Item>
              )}
            />
        </div>
      : null;
  }
}
