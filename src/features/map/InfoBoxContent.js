import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'antd';

export default class InfoBoxContent extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  };
  
  get resolveButton() {
    return (
      <Button type="primary">
          Resolve
      </Button>
    )
  }

  get deleteButton() {
    return (
      <Button type="danger">
          Delete
      </Button>
    )
  }

  get buttons() {
    return (
      <div className="map-info-box-content">
        {this.resolveButton}
        {this.deleteButton}
      </div>
    )
  }

  render() {
    console.log(this.props.id)
    return (
      <div className="map-info-box-content">
        <Card title={this.props.type} bordered={false}>
          <p>{this.props.message}</p>
        </Card>
        { this.buttons }
      </div>
    );
  }
}
