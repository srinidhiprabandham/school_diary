import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Alert,
  ToastAndroid,
  ActivityIndicator
} from 'react-native';

import Event from './Event.js';

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: null,
    }
  }

  componentDidMount() {
    fetch("https://schooldiary.online/api/admin/events", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": this.props.current_user.auth_token,
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.status == 0) {
        this.setState({events: responseJson.events});
      }
      if(responseJson.status == 1) {
        ToastAndroid.showWithGravity(responseJson.message,ToastAndroid.SHORT,ToastAndroid.BOTTOM);
      }
    })
    .catch((error) => {
      Alert.alert("Opps some thing went wrong !!")
    })
  }

  render() {
    if(this.state.events == null) {
      return <ActivityIndicator animating={true} style={{alignItems: 'center',justifyContent: 'center',padding: 8,height: 80}} size="large" />
    }
    return (
      <View>
        {
          this.state.events.map(function(evnt,index) {
            return (
              <Event key={index} evnt={evnt} />
            )
          })
        }
      </View>
    )
  }
}
