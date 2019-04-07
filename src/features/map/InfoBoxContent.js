import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'antd';

export default class InfoBoxContent extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,

  };

  render() {
    return (
      <div className="map-info-box-content">
        <Button.Group style={{ width: '200px', textAlign: 'center', marginBottom: '0.25em' }}>
          <Button
            type="primary"
            size="small"
            icon="check"
            style={{ width: '47.5%', backgroundColor: '#E8453C', borderColor: '#FFFFFF' }}>
              Resolve
          </Button>
          <Button
            type="primary"
            size="small"
            icon="delete"
            style={{ width: '47.5%', backgroundColor: '#E8453C', borderColor: '#FFFFFF' }}>
              Delete
          </Button>
        </Button.Group>
        <Card title={this.props.type} bordered={false}>
          <p>{this.props.message}</p>
        </Card>
      </div>
    );
  }
}
