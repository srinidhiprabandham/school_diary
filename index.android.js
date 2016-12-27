/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Storage from 'react-native-storage';
import Toolbar from 'react-native-material-design';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  View,
  AsyncStorage,
} from 'react-native';

var storage = new Storage({
  size: 4000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
})

global.storage = storage;

import SplashScreen from "./App/components/SplashScreen.js"
import Login from "./App/components/Login.js";
import Dashboard from "./App/components/Dashboard.js";
import ServerStats from './App/components/ServerStats.js';
import LeavePlan from './App/components/LeavePlan.js';

//NOTE: we cannot use the import { Login, Dashboard } from "./App/components/Login.js"
//      because we are doing an export defaults see : http://stackoverflow.com/questions/31852933/why-es6-react-component-works-only-with-export-default

export default class SchoolDiary extends Component {
  renderScene(route,navigator) {
    if(route.name === 'Splash') {
      component = <SplashScreen navigator={navigator} />
    }
    if(route.name === 'Login') {
      component = <Login navigator={navigator} />
    }
    if(route.name === 'Dashboard') {
      component = <Dashboard navigator={navigator} current_user={route.current_user} />
    }
    if(route.name === 'ServerStats') {
      component = <ServerStats navigator={navigator} current_user={route.current_user} />
    }
    if(route.name === 'LeavePlan') {
      component = <LeavePlan navigator={navigator} current_user={route.current_user} />
    }
    return component
  }

  render() {
    return (
      <Navigator
        initialRoute={{ name: "Splash" }}
        renderScene={ this.renderScene.bind(this) }
      />
    )
  }
}

AppRegistry.registerComponent('SchoolDiary', () => SchoolDiary);
