import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  Navigator,
} from 'react-native';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
  }

  //Initially we check to see if the user is logged in.
  //If yes then route to dashboard, else route to login.
  componentDidMount() {
    console.log("Loaded Splash Screen");
    var loginState = storage.cache.loginState;
    storage.load({
      key: "loginState",
    }).then(ret => {
      if(ret == null) {
        //We use immediatelyResetRouteStack, as we don't want the swipe left to take them to this page again.
        this.props.navigator.immediatelyResetRouteStack([{name: "Login"}]);
      } else {
        this.props.navigator.immediatelyResetRouteStack([{name: "Dashboard", current_user: ret}]);
      }
    });
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
      <View>
        <Image source={require('../assets/splash.jpg')} />
      </View>
    )
  }
}
