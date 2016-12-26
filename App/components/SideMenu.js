import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  Navigator,
  DrawerLayoutAndroid
} from 'react-native';

import {
  Avatar,
  Drawer,
  Divider,
  COLOR,
  TYPO,
} from 'react-native-material-design';

export default class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  render() {
    return(
      <Navigator
        renderScene={this.renderScene.bind(this)}
      />
    )
  }

  logout() {
    //We first delete the loginState
    //Then we redirect to login scene
    storage.save({
      key: "loginState",
      rawData: null,
      expires: null,
    })
    this.props.navigator.immediatelyResetRouteStack([{ name: "Login" }]);
  }

  navigateTo = (routeName) => {
    const { drawer, navigator } = this.context;
    switch(routeName) {
      case 'ServerStats':
        this.props.navigator.immediatelyResetRouteStack([{ name: "ServerStats", current_user: this.props.current_user}]);
        break;
      case 'Dashboard':
        this.props.navigator.immediatelyResetRouteStack([{ name: "Dashboard", current_user: this.props.current_user}]);
        break;
      default:
          console.log("This is side menu loading");
    }
  }

  renderScene(route,navigator) {
    if(this.props.current_user == null) {
      return null;
    }
    return(
      <Drawer theme='light'>
        <Drawer.Header image={<Image source={require('../assets/nav.jpg')} />}>
          <View style={styles.header}>
              <Avatar size={80} image={<Image source={{ uri: "http://facebook.github.io/react-native/img/opengraph.png?2" }}/>} />
              <Text style={[styles.text, COLOR.paperGrey50, TYPO.paperFontSubhead]}>Welcome, {this.props.current_user.full_name} !!</Text>
          </View>
        </Drawer.Header>

        <Drawer.Section items={[{
            icon: 'home',
            value: 'Dashboard',
            onPress: () => this.navigateTo("Dashboard"),
            onLongPress: () => this.navigateTo("Dashboard")
          }]}
        />
        <Drawer.Section syle={styles.logout}
          items={[{
            icon: 'power',
            value: 'ServerStats',
            onPress: () => this.navigateTo("ServerStats"),
            onLongPress: () => this.navigateTo("ServerStats")
          }]}
        />
        <Divider />
        {/*All these also should be based on the roles*/}
        <Drawer.Section items={[]} />
        <Drawer.Section items={[]} />
        <Drawer.Section items={[]} />
        <Drawer.Section items={[]} />
        <Drawer.Section items={[]} />
        <Drawer.Section items={[]} />
        <Drawer.Section items={[]} />
        <Drawer.Section items={[]} />
        <Drawer.Section items={[]} />
        <Drawer.Section items={[]} />
        <Drawer.Section items={[]} />
        <Drawer.Section items={[]} />
        <Drawer.Section items={[]} />
        <Drawer.Section items={[]} />
        <Drawer.Section items={[]} />
        <Drawer.Section items={[]} />
        <Drawer.Section items={[]} />
        <Drawer.Section items={[]} />
        <Drawer.Section items={[]} />
        <Drawer.Section items={[]} />
        <Drawer.Section items={[]} />
        <Drawer.Section items={[]} />
        <Drawer.Section items={[]} />
        <Drawer.Section items={[]} />
        <Drawer.Section items={[]} />
        <Drawer.Section items={[]} />
        <Drawer.Section items={[]} />
        <Drawer.Section items={[]} />
        <Drawer.Section syle={styles.logout}
          items={[{
            icon: 'power',
            value: 'Logout',
            onPress: this.logout
          }]}
        />
        <Divider />
      </Drawer>
    )
  }
}

const styles = {
    header: {
        paddingTop: 16
    },
    text: {
        marginTop: 20
    },
    logout: {
      paddingTop: 1000,
      marginTop: 1000
    }
};
