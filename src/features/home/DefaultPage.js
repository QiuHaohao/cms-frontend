import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import { PageCrisisMap } from '../map'
import { PageReportCrisis } from '../report'
import { PageHeader } from '../common'

import { BrowserRouter as Router, Route } from "react-router-dom";

import { Layout } from 'antd';
const { Header, Content } = Layout;

export class DefaultPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  get content() {
    return (
      <React.Fragment>
        <Route exact path="/" component={PageCrisisMap} />
        <Route exact path="/crisis-map" component={PageCrisisMap} />
        <Route exact path="/report-crisis" component={PageReportCrisis} />
      </React.Fragment>
    )
  }

  render() {
    return (
      <Router>
        <div className="home-default-page">
          <Layout>
            <Header style={{position:'fixed', zIndex:999, width: "100%"}}>
              <PageHeader />
            </Header>
            <Content style={{backgroundColor: "white", marginTop: 64 }} >
              { this.content }
            </Content>
          </Layout>
        </div>
      </Router>
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
