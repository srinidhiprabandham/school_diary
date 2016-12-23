import React, { Component } from 'react';

import {
  Card
} from 'react-native-material-design';

import {
  View,
  Text,
  StyleSheet,
  Alert
} from 'react-native';

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
        console.log("Got response from server");
        this.setState({events: responseJson.events});
      }
      if(responseJson.status == 1) {
        Alert.alert("Opps some thing went wrong !!")
      }
    })
    .catch((error) => {
      Alert.alert("Opps some thing went wrong !!")
    })
  }

  render() {
    if(this.state.events == null) {
      return null;
    }
    return (
      <View>
        {
          this.state.events.map(function(event,index) {
            return (
              <Card key={index}>
                <Text>{event}</Text>
              </Card>
            )
          })
        }
      </View>
    )
  }
}
