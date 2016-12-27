import React, { Component } from 'react';

import { 
  Card,
  IconToggle,
  Icon,
} from 'react-native-material-design';

import {
  Alert,
  Button,
  DrawerLayoutAndroid,
  StyleSheet,
  Text,
  View,
  TextInput,
  Navigator,
} from 'react-native';

import { PostRequest } from '../utils/HelperFunctions.js';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school_code: "",
      login: "",
      password: "",
    }
    this.submitLogin = this.submitLogin.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }


  render() {
    return (
      <Navigator
        renderScene={this.renderScene.bind(this)}
      />
    )
  }

  renderScene(route,navigator) {
    return (
      <View>
        <Card style={styles.centered} elevation={5}>
          <Text style={styles.welcome}> LOGIN </Text>
          <Card.Body>
            <TextInput
              value={this.state.school_code}
              placeholder="School Code"
              placeholderTextColor="grey"
              onChangeText={(text) => this.setState({school_code: text})}
            />

            <TextInput
              value={this.state.login}
              placeholder="Email/Mobile Number/Register Number"
              placeholderTextColor="grey"
              onChangeText={(text) => this.setState({login: text})}
            />

            <TextInput
              value={this.state.password}
              placeholder="Password"
              placeholderTextColor="grey"
              secureTextEntry={true}
              onChangeText={(text) => this.setState({password: text})}
            />

            <Button 
              onPress={this.submitLogin}
              title="LOGIN"
              color="#009688"
              accessibilityLabel=""
            />
          </Card.Body>
        </Card>
      </View>
    )
  }

  submitLogin(e) {
    PostRequest("validate_user",this.state,null)
    .then((response) => response.json())
    .then((responseJson) => {
      //If success full login then save user info and continue
      if(responseJson.status == 0) {
        this.onLogin(responseJson);
      }
      //TODO show a toast or some thing.
      if(responseJson.status == 1) {
        Alert.alert(responseJson.reason)
      }
    })
    .catch((error) => {
      debugger;
      Alert.alert("Opps something went wrong - from here !!");
    })
  }

  onLogin(data) {
    //Here we will not use push as it has a long swipe back that will
    //take the user back to login page.
    storage.save({
      key: "loginState",
      rawData: data,
      expires: null,
    })
    this.props.navigator.immediatelyResetRouteStack([{ name: "Dashboard", current_user: data, navigator: this.props.navigator }]);
  }

}

const styles = StyleSheet.create({
  centered: {
    marginTop: 100,
    marginLeft: 15,
    marginRight: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  h1: {
    fontSize: 14,
    textAlign: 'center',
    color: "#333333",
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: "#009688",
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  error_text: {
    textAlign: 'center',
    color: 'red',
    marginBottom: 2,
  }
});
