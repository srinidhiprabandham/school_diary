import React, { Component } from 'react';

import {
  View,
  Text,
  ActivityIndicator,
  Navigator,
  ScrollView,
  DrawerLayoutAndroid
} from 'react-native';

import {
  Card
} from 'react-native-material-design';

import TabNavigator from 'react-native-tab-navigator';
import SideMenu from "./SideMenu.js";

export default class ServerStats extends Component {
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
    return (
      <Navigator renderScene={this.renderScene.bind(this)} />
    )
  }

  renderScene(route,navigator) {
    var navigationView = (
        <SideMenu current_user={this.props.current_user} navigator={this.props.navigator}/>
    );
    if(this.state.stats == null) {
      return <ActivityIndicator animating={true} style={{alignItems: 'center',justifyContent: 'center',padding: 8,height: 80}} size="large" />
    }
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}>

        <TabNavigator tabBarStyle={{height: 35, backgroundColor: '#020202'}}>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'sysload'}
            title="System Load"
            onPress={() => this.setState({ selectedTab: 'sysload' })}>
            {
              <Card>
                <Card.Body>
                  <Text>Current CPU usage on Server is : {this.state.stats.system_load}</Text>
                </Card.Body>
              </Card>
            }
          </TabNavigator.Item>

          <TabNavigator.Item
            selected={this.state.selectedTab === 'mem'}
            title="Memory Usage"
            onPress={() => this.setState({ selectedTab: 'mem' })}>
            {
              <Card>
                <Card.Body>
                  <Text>Current RAM usage on Server is : {this.state.stats.ram_usage}</Text>
                </Card.Body>
              </Card>
            }
          </TabNavigator.Item>

          <TabNavigator.Item
            selected={this.state.selectedTab === 'users'}
            title="Online Users"
            onPress={() => this.setState({ selectedTab: 'users' })}>
            {
              <Card>
                <Card.Body>
                  <Text>{this.state.stats.users_online} are currently logged in now.</Text>
                </Card.Body>
              </Card>
            }
          </TabNavigator.Item>
        </TabNavigator>
      </DrawerLayoutAndroid>
    )
  }
}
