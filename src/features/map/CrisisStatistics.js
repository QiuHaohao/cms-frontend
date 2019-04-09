import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Statistic, Row, Col } from 'antd';

const _ = require('lodash')

export default class CrisisStatistics extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  get numTotalCrisis() {
    return Object.keys(this.props.data).length
  }

  get numCrisisByType() {
    return _.reduce(
      this.props.data,
      (result, item) => {
        if (result[item.Type]) {
          return {...result, [item.Type]: result[item.Type] + 1};
        }
        else {
          return {...result, [item.Type]: 1};
        }
      }, {})
  }

  render() {
    return this.numTotalCrisis
      ? <div className="map-crisis-statistics">
          <Col>
            <Row gutter={16}>
              <Col span={12}>
                <Statistic title="Total Incidents" value={this.numTotalCrisis} />
              </Col>
              
            </Row>
            <Row gutter={16}>
              {_.map(
                this.numCrisisByType,
                (value, key) => (
                  <Col span={12} style={{maxWidth:"180px"}}>
                    <Statistic key={key} title={key} value={value} />
                  </Col>
                )
              )}
            </Row>
          </Col>
        </div>
      : null;
  }
}
