import React, { Component } from 'react';
import { IconToggle, Icon } from 'react-native-material-design';
import {
  StatusBar,
  View,
  Text,
  Navigator,
} from 'react-native';

import SideMenu from 'react-native-side-menu';
import Menu from "./Menu.js";
import NavgationBar from 'react-native-navbar';
import Hr from 'react-native-hr';

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    }
    this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({
      isOpen: true,
    });
  }

  render() {
    return(
      <Navigator renderScene={this.renderScene.bind(this)} />
    )
  }

  renderScene(route,navigator) {
    const menu = <Menu navigator={this.props.navigator} current_user={this.props.current_user}/>;
    const menuTitle = {
      title: this.props.title
    };
    const leftMenu = {
      titile: "Menu",
      handler: () => this.toggleMenu()
    }

    return (
      <SideMenu menu={menu} isOpen={this.state.isOpen}>
        {/*These background color should come from API*/}
        <View style={{backgroundColor: "#fdfdfd"}}>
          <StatusBar backgroundColor={"#009688"} translucent={true} />
          {/* This has to be there other wise the first child will not be shown for some reason */}
          <Text> </Text>
          <NavgationBar title={menuTitle} leftButton={
            <IconToggle color={'#009688'} opacity={1} onPress={() => this.toggleMenu()}>
              <Icon name="menu" color="#000000" style={{marginTop: 10}}/>
            </IconToggle>}
          />
          <Hr lineColor='#009688' />
          {this.props.children}
        </View>
      </SideMenu>
    );
  }
}
