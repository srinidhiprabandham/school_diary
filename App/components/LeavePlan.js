import React, { Component } from 'react';

import {
  Card,
  FormLabel,
  FormInput
} from 'react-native-elements';

import {
  Navigator,
} from 'react-native';
import Layout from "./Layout.js";

export default class LeavePlan extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navigator
        renderScene={this.renderScene.bind(this)}
      />
    )
  }

  renderScene(route,navigator) {
    return(
      <Layout title={'Leave Plan'} current_user={this.props.current_user} navigator={this.props.navigator}>
        <Card title={"Leave Application"}>
          <FormLabel>Start Date</FormLabel>
        </Card>
      </Layout>
    );
  }
}
