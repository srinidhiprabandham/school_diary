import React, { Component } from 'react';

import {
  View,
  Image,
  Navigator,
  Dimensions
} from 'react-native';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
  }

  //Initially we check to see if the user is logged in.
  //If yes then route to dashboard, else route to login.
  componentDidMount() {
    var loginState = storage.cache.loginState;
    storage.load({
      key: "loginState",
    }).then(ret => {
      if(ret == null) {
        //We use immediatelyResetRouteStack, as we don't want the swipe left to take them to this page again.
        this.props.navigator.immediatelyResetRouteStack([{name: "Login"}]);
      } else {
        setTimeout (() => {
          this.props.navigator.immediatelyResetRouteStack([{name: "Dashboard", current_user: ret}]);
        }, 1000);
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
    var {height, width} = Dimensions.get('window');
    return (
      <View style={{flex: 1, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center'}}>
        <Image style={{position: 'absolute', left: 0, top: 0, width: width, height: height}} source={require('../assets/splash.jpg')} />
      </View>
    )
  }
}
