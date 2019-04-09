import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table } from 'antd';

import ButtonDelete from './ButtonDelete'
import ButtonResolve from './ButtonResolve'

const _ = require('lodash')

export default class CrisisList extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  get numTotalCrisis() {
    return Object.keys(this.props.data).length
  }
  
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
      'id'
    ))
  }
  columns = [ {
    title: 'ID',
    dataIndex: 'id',
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
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (text, record) => {
      return (
      <div className="map-crisis-list-actions">
        <ButtonResolve id={record.id} />
        <ButtonDelete id={record.id} />
      </div>
    )}
  }];

  render() {
    return this.numTotalCrisis !== 0
      ? <div className="map-crisis-list">
          <div className="map-crisis-list-header">
            List of Incidents
          </div>
            <Table dataSource={this.dataWithKeyReversedID} columns={this.columns} />
        </div>
      : null;
  }
}
