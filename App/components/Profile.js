import React, { Component } from 'react';
import { Card, Icon } from 'react-native-elements';
import { Navigator, Text } from 'react-native';
import Layout from "./Layout.js";

export default class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Navigator renderScene={this.renderScene.bind(this)} />
    )
  }

  renderScene(route,navigator) {
    return (
      <Layout title={"Profile"} current_user={this.props.current_user} navigator={this.props.navigator}>
        <Card title="Profile">
          <Text> This is where the persons Profile will come </Text>
        </Card>
      </Layout>
    )
  }
}
