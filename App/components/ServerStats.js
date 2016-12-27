import React, { Component } from 'react';

import {
  View,
  Text,
  ActivityIndicator,
  Navigator,
  ScrollView,
} from 'react-native';

import {
  Card
} from 'react-native-material-design';

import Layout from "./Layout.js";
import TabbedStats from './TabbedStats.js';

export default class ServerStats extends Component {
  render() {
    return (
      <Layout title={'Server Status'} current_user={this.props.current_user} navigator={this.props.navigator}>
        <TabbedStats current_user={this.props.current_user} />
      </Layout>
    )
  }
}
