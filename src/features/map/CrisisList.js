import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table } from 'antd';

const _ = require('lodash')

export default class CrisisList extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };
  
  get dataWithKey() {
    return _.map(
      this.props.data,
      (item, index) => {
          return {
          ...item,
          key: index
        }
      }
    )
  }

  get dataWithKeyReversedID() {
    return _.reverse(_.sortBy(
      this.dataWithKey,
      'level_0'
    ))
  }

  columns = [ {
    title: 'ID',
    dataIndex: 'level_0',
    key: 'id',
  }, {
    title: 'Time',
    dataIndex: 'start_time',
    key: 'time',
  },{
    title: 'Incident Type',
    dataIndex: 'Type',
    key: 'type',
  },{
    title: 'Description',
    dataIndex: 'message_content',
    key: 'message',
  }];

  render() {
    return this.props.data.length !== 0
      ? <div className="map-crisis-list">
          <div className="map-crisis-list-header">
            List of Incidents
          </div>
            <Table dataSource={this.dataWithKeyReversedID} columns={this.columns} />
        </div>
      : null;
  }
}
