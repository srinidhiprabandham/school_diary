import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

import {
  Card,
} from 'react-native-elements';

export default class TabbedStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: null,
      selectedTab: "sysload",
    }
  }

  componentDidMount() {
    fetch("https://schooldiary.online/api/admin/server_stats", {
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
        this.setState({stats: responseJson.data});
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
    if(this.state.stats == null) {
      return <ActivityIndicator animating={true} style={{alignItems: 'center',justifyContent: 'center',padding: 8,height: 80}} size="large" />
    }
    return (
      <ScrollView>
        <Card containerStyle={{padding: 0}} title='System Load'>
          <Text style={{marginBottom: 10}}>Current load on the System is : {this.state.stats.system_load} </Text>
        </Card>

        <Text></Text>

        <Card containerStyle={{padding: 0}} title='Ram Usage'>
          <Text style={{marginBottom: 10}}>Current RAM Usage is : {this.state.stats.ram_usage} </Text>
        </Card>

        <Text></Text>

        <Card containerStyle={{padding: 0}} title='Online Users'>
          <Text style={{marginBottom: 10}}>There are a total of : {this.state.stats.users_online} Users logged in at the moment.</Text>
        </Card>

      </ScrollView>
    );
  }

}
