import React, { Component } from 'react';

import {
  Icon,
} from 'react-native-material-design';

import {
  Navigator,
} from 'react-native';

//Again Since the user has done a export Defaults
//for this one. We have to import it like below.
import Layout from "./Layout.js";
import Events from "./Events.js";

export default class Dashboard extends Component {
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
    return (
      <Layout title={'Events'} current_user={this.props.current_user} navigator={this.props.navigator}>
        <Events current_user={this.props.current_user} />
      </Layout>
    )
  }
}

