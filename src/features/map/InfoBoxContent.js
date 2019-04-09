import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';

import ButtonDelete from './ButtonDelete'
import ButtonResolve from './ButtonResolve'

export default class InfoBoxContent extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.string,
    preview: PropTypes.bool,
  };

  defaultProps = {
    preview: false,
  }

  get buttons() {
    return (
      <div className="map-info-box-content">
        <ButtonDelete id={this.props.id}/>
        <ButtonResolve id={this.props.id}/>
      </div>
    )
  }

  render() {
    return (
      <div className="map-info-box-content">
        <Card title={this.props.type} bordered={false}>
          { this.props.preview ? null : <p>{'ID: ' + this.props.id}</p> }
          <p>{this.props.message}</p>
        </Card>
        { this.props.preview ? null : this.buttons }
      </div>
    );
  }
}
