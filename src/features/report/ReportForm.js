import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import {
  Form, Input, Tooltip, Icon, Select, Button,
} from 'antd';

import { postalCodeToCoordinates } from '../../utils'

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
    
  }

  setLocation(location) {
    this.setState({
      ...this.state,
      location
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
    else if (!value) {
      callback();    // Empty callback, only "Please input the postal code for the location of the incident!" will show
    }
    else {
      callback('Please input a valid postal code!');
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Error: ', values)
      if (!err) {
        console.log('Received values of form: ', values);
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
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item
            key="Name"
            label="Name"
          >
            {getFieldDecorator('name', {
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
            {getFieldDecorator('mobile', {
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
              && `Lat: ${this.state.location.lat}   Lng: ${this.state.location.lng}`}
          >
            {getFieldDecorator('postalCode', {
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
            {getFieldDecorator('incidentType', {
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
            {getFieldDecorator('description', {
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
