import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal, Row, Col } from 'antd';

import CrisisMap from '../map/CrisisMap'

const _ = require('lodash')

export default class ReportConfirmModal extends Component {
  static propTypes = {
    formData: PropTypes.object.isRequired,
    handleOk: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    visible: PropTypes.bool,
    confirmLoading: PropTypes.bool,
  };

  rows = [
    "Name",
    "Mobile",
    "PostalCode",
    "Type",
    "Message"
  ]

  rowLabels = {
    "Name": "Name",
    "Mobile": "Mobile",
    "PostalCode": "Postal Code",
    "Type": "Incident Type",
    "Message": "Description"
  }

  render() {
    return (
      <Modal
          title="Confirm Submission"
          visible={this.props.visible}
          onOk={this.props.handleOk}
          confirmLoading={this.props.confirmLoading}
          onCancel={this.props.handleCancel}
        >
        {this.props.visible
          ? <div class="report-report-confirm-modal">
              <div class="report-report-confirm-modal-content">
                <Col>
                  {
                    _.map(
                      this.rows,
                      (r) => 
                        <Row key={r}>
                          <Col span={10}>
                            <div className="report-report-confirm-modal-label"> 
                              { this.rowLabels[r] + ": " } 
                            </div>
                          </Col>
                          <Col span={10}>
                            <div　className="report-report-confirm-modal-text"> 
                              { this.props.formData[r] } 
                            </div>
                          </Col>
                        </Row>
                      )
                  }
                </Col>
              </div>
              <CrisisMap data={[this.props.formData]} size={{width:"400px", height: "300px"}} defaultZoom={10}/>
            </div>
          : null
        }
      </Modal>
    );
  }
}
