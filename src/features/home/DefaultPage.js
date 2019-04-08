import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import { PageCrisisMap } from '../map'
import { PageReportCrisis } from '../report'
import { PageAuth } from '../auth'
import { PageHeader } from '../common'

import { isLoggedIn } from '../auth/redux/selectors'

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { Layout } from 'antd';
const { Header, Content } = Layout;



export class DefaultPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          this.props.loggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/auth",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

  get content() {
    const PrivateRoute = this.PrivateRoute.bind(this)
      return (
        <React.Fragment>
          <PrivateRoute exact path="/" component={PageCrisisMap} />
          <PrivateRoute exact path="/crisis-map" component={PageCrisisMap} />
          <PrivateRoute exact path="/report-crisis" component={PageReportCrisis} />
          <Route exact path="/auth" component={PageAuth} />
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
    loggedIn: isLoggedIn(state)
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultPage);
