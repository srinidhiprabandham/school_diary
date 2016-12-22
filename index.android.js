/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Login from "./App/components/Login.js"
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class SchoolDiary extends Component {
  render() {
    return (
        <Login />
    );
  }
}

AppRegistry.registerComponent('SchoolDiary', () => SchoolDiary);
