import React, { Component } from 'react';

import {
  Card,
  MaterialToolbar,
} from 'react-native-material-design';

import {
  ScrollView,
  Text,
  Navigator,
  DrawerLayoutAndroid
} from 'react-native';

//Again Since the user has done a export Defaults
//for this one. We have to import it like below.
import Hr from 'react-native-hr';

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

        <ScrollView>
          <Hr lineColor='#b3b3b3' text='Events' textColor='steelblue' />
          <Events current_user={this.props.current_user} />
        </ScrollView>
      </DrawerLayoutAndroid>
    )
  }
}

