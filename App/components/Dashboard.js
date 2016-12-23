import React, { Component } from 'react';

import {
  Card,
  MaterialToolbar,
} from 'react-native-material-design';

import {
  View,
  Text,
  Navigator,
  DrawerLayoutAndroid
} from 'react-native';

import Events from "./Events.js";
import SideMenu from "./SideMenu.js";

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
    var navigationView = (
        <SideMenu current_user={this.props.current_user} navigator={this.props.navigator}/>
    );
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}>

        <Events current_user={this.props.current_user} />
      </DrawerLayoutAndroid>
    )
  }
}

