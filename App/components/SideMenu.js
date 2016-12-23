import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  Navigator
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

  renderScene(route,navigator) {
    return(
      <Drawer theme='light'>
        <Drawer.Header image={<Image source={require('../assets/nav.jpg')} />}>
          <View style={styles.header}>
              <Avatar size={80} image={<Image source={{ uri: "http://facebook.github.io/react-native/img/opengraph.png?2" }}/>} />
              <Text style={[styles.text, COLOR.paperGrey50, TYPO.paperFontSubhead]}>Welcome, {this.props.current_user.full_name} !!</Text>
          </View>
        </Drawer.Header>

        <Drawer.Section
          items={[{
            icon: 'home',
            value: 'Dashboard',
          }]}
        />
        <Divider />

        <Drawer.Section
          items={[]}
        />
        <Drawer.Section
          items={[]}
        />
        <Drawer.Section
          items={[]}
        />
        <Drawer.Section
          items={[]}
        />
        <Drawer.Section
          items={[]}
        />
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
      paddingTop: 500,
      marginTop: 500
    }
};
