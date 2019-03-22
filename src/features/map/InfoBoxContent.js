import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';

export default class InfoBoxContent extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,

  };

  render() {
    return (
      <div className="map-info-box-content">
        <Card title={this.props.type} bordered={false}>
          <p>{this.props.message}</p>
        </Card>
      </div>
    );
  }
}
