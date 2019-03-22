import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import { CrisisMap } from '../map'
import { PageHeader } from '../common'

import { Layout } from 'antd';
const { Header, Content } = Layout;

export class DefaultPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="home-default-page">
        <Layout>
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%', background: "#fff", padding: '0 10px' }}>
            <PageHeader />
          </Header>
          <Content style={{ marginTop: 64, width: '100%' }}>
            <CrisisMap />
          </Content>
        </Layout>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultPage);
