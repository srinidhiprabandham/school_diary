import React, { Component } from 'react';

import { 
  Card,
} from 'react-native-material-design';

import {
  Alert,
  AppRegistry,
  Button,
  DrawerLayoutAndroid,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school_code: "",
      login: "",
      password: "",
    }
    this.submitLogin = this.submitLogin.bind(this);
  }

  submitLogin(e) {
    //This is where I will have to call the API and check if the request is valid or not
    //
    fetch("https://schooldiary.online/api/validate_user", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        login: this.state.login,
        password: this.state.password,
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.status == 0) {
        Alert.alert("Welcome ", responseJson.full_name)
      }
      if(responseJson.status == 1) {
        Alert.alert(responseJson.reason)
      }
    })
    .catch((error) => {
      Alert.alert("Opps something went wrong !!")
    })
  }

  render() {
    var navigationView = (
        <Text>This is a test</Text>
    )
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
