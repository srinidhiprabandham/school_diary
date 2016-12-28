import React, { Component } from 'react';
import { ScrollView, Text, Navigator, View } from 'react-native';
import { List, ListItem, Icon, Card } from 'react-native-elements';
import Hr from 'react-native-hr';

import Contains from '../utils/HelperFunctions.js';

export default class Menu extends Component {
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
    switch(routeName) {
      case 'ServerStats':
        this.props.navigator.immediatelyResetRouteStack([{ name: "ServerStats", current_user: this.props.current_user }]);
        break;
      case 'Dashboard':
        this.props.navigator.immediatelyResetRouteStack([{ name: "Dashboard", current_user: this.props.current_user }]);
        break;
      case 'LeavePlan':
        this.props.navigator.immediatelyResetRouteStack([{ name: "LeavePlan", current_user: this.props.current_user }]);
        break;
      case 'Profile':
        this.props.navigator.immediatelyResetRouteStack([{ name: "Profile", current_user: this.props.current_user }]);
        break;
      case 'Logout':
        this.logout();
        break;
      default:
          console.log("This is side menu loading");
    }
  }

  renderScene(route,navigator) {
    //TODO this has to come dynamically
    var user_stuff = [{
      title: "User Profile",
      path: "Profile",
      icon: "account-circle",
    }];

    var routes = [{
      title: "Dashboard",
      path: "Dashboard",
      icon: "home"
    },
    {
      title: "Server Stats",
      path: "ServerStats",
      icon: "storage"
    },
    {
      title: "Request Leave",
      path: "LeavePlan",
      icon: "airplanemode-active",
    },
    {
      title: "Logout",
      path: "Logout",
      icon: "power-settings-new",
    }];
    return(
      <ScrollView style={styles.sidebar}>
        {/*Again this dummy thing has to be there other wise below things wont be shown */}
        <Text> </Text>
        <Text style={styles.sidelabel}> Profile </Text>
        <List>
          {
            user_stuff.map((item,i) => (
                <ListItem key={i} title={item.title} leftIcon={{name: item.icon}} onPress={() => this.navigateTo(item.path)}/>
            ))
          }
        </List>

        <Text style={styles.sidelabel}> Menus </Text>

        <List>
          {
            routes.map((item,i) => (
                <ListItem key={i} title={item.title} leftIcon={{name: item.icon}} onPress={() => this.navigateTo(item.path)}/>
            ))
          }
        </List>
      </ScrollView>
    )
  }
}

const styles = {
    header: {
        paddingTop: 16
    },
    sidelabel: {
        marginTop: 20
    },
    logout: {
      paddingTop: 1000,
      marginTop: 1000
    },
    sidemenu_header: {
      backgroundColor: "#009688",
      height: 100
    },
    sidebar: {
      backgroundColor: "#f0f0f0",
    }
};
