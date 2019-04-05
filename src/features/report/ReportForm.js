import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import {
  Form, Input, Tooltip, Icon, Select, Button,
} from 'antd';

import { postalCodeToCoordinates } from '../../utils'

import ReportConfirmModal from './ReportConfirmModal'

const _ = require('lodash')

const { TextArea } = Input;
const Option = Select.Option;

const INCIDENT_TYPES = [
  "Roadwork",
  "Vehicle breakdown"
]

export class ReportForm extends Component {
  static propTypes = {
    report: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    modalVisible: false,
    formData: null,
  }

  componentDidUpdate(prevProps) {
    if (prevProps.report.actionPostReportFormDataPending
    && !this.isActionPostReportFormDataPending) {
      this.hideModal()
      if (!this.isActionPostReportFormDataError) {
        this.props.form.resetFields()
      }
    }
  }

  get isActionPostReportFormDataPending() {
    return this.props.report.actionPostReportFormDataPending;
  }

  get isActionPostReportFormDataError() {
    return Boolean(this.props.report.actionPostReportFormDataError);
  }

  hideModal() {
    this.setState({ ...this.state, modalVisible: false })
  }

  setLocation(location) {
    this.setState({
      ...this.state,
      location: location 
        ? {
          Latitude: location.lat,
          Longitude: location.lng}
        : undefined,
    })
  }

  validateName = (rule, value, callback) => {
    const nameRegex = /^[A-Za-z][A-Za-z'-]+([ A-Za-z][A-Za-z'-]+)*/;
    if (!value || value.trim().match(nameRegex)) {
      callback();
    } else {
      callback('Please input a valid name!');
    }
  }

  validateMobileNumber = (rule, value, callback) => {
    const mobileNumberRegex = /^[689]\d{7}$/
    if (!value || value.match(mobileNumberRegex)) {
      callback();
    } else {
      callback('Please input a valid mobile number!');
    }
  }

  validatePostalCode = (rule, value, callback) => {
    const postalCodeRegex = /^\d{6}$/
    this.setLocation(undefined)
    if (value && value.match(postalCodeRegex)) {
      postalCodeToCoordinates(value).then(
        location => { 
          if (location) {
            this.setLocation(location) 
            callback();
          }
          else {
            callback("Address not found!")
          }
        })
    }
    else if (value) {
      callback('Please input a valid postal code!');
    }
    else {
      callback()
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const formData = { ...values, ...this.state.location }
        console.log('Received values of form: ', formData);
        this.setState({ ...this.state, modalVisible: true, formData })
      }
      else {
        console.log('Error: ', values)
      }
    });
  }

  getLabelWithTooltip(label, msg, iconType="question-circle-o") {
    return (
      <span>
        {label + " "}
        <Tooltip title={msg}>
          <Icon type={iconType} />
        </Tooltip>
      </span>
    )
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <div className="report-report-form">
        <ReportConfirmModal
          formData={this.state.formData}
          visible={this.state.modalVisible}
          confirmLoading={this.isActionPostReportFormDataPending}
          handleOk={() =>{ this.props.actions.actionPostReportFormData(this.state.formData)}}
          handleCancel={() => this.hideModal()}/>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item
            key="Name"
            label="Name"
          >
            {getFieldDecorator('Name', {
              rules: [{
                required: true, message: 'Please input the name of the reporter!',
              }, {
                validator: this.validateName
              }],
            })(
                <Input />
            )}
          </Form.Item>
          <Form.Item
            key="Mobile number"
            label={
              this.getLabelWithTooltip(
                "Mobile Number", 
                "Singapore mobile numbers start with 6, 8, or 9, and are 8 digits long (e.g. 87654321)."
              )
            }
          >
            {getFieldDecorator('Mobile', {
              rules: [{
                required: true, message: 'Please input the mobile number of the reporter!',
              }, {
                validator: this.validateMobileNumber,
              }],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item
            key="Postal Code"
            label={
              this.getLabelWithTooltip(
                "Postal Code", 
                "Singapore postal codes are 6 digits long (e.g. 639928)."
              )
            }
            extra={this.state.location 
              && `Lat: ${this.state.location.Latitude}   Lng: ${this.state.location.Longitude}`}
          >
            {getFieldDecorator('PostalCode', {
              rules: [{
                required: true, message: 'Please input the postal code for the location of the incident!',
              }, {
                validator: this.validatePostalCode,
              }],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item
            key="Incident type"
            label="Incident Type"
          >
            {getFieldDecorator('Type', {
              rules: [{
                required: true, message: 'Please input the incident type!',
              }],
            })(
              <Select>
                {
                  _.map(
                    INCIDENT_TYPES,
                    t => <Option key={t} value={t}>{t}</Option>
                  )
                }
              </Select>
            )}
          </Form.Item>
          <Form.Item
            key="Description"
            label="Description"
          >
            {getFieldDecorator('Message', {
              rules: [{
                required: true, message: 'Please input the incident description!',
              }],
            })(
              <TextArea rows={4} />
            )}
          </Form.Item>
          <Form.Item key="submit" {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    report: state.report,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(ReportForm);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRegistrationForm);
