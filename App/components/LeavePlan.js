import React, { Component } from 'react';
import { Navigator, Alert} from 'react-native';
import { Card, FormLabel, FormInput, Button } from 'react-native-elements';
import Layout from "./Layout.js";
import DatePicker from 'react-native-datepicker';
import { CurrentDate } from "../utils/HelperFunctions.js";
import { RequestApi } from '../utils/HelperFunctions.js';

export default class LeavePlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start_date: null,
      end_date: null,
      reason: null,
    }
    this.applyLeave.bind(this);
  }

  applyLeave() {
    RequestApi.post("teacher/leave_plan",this.state,this.props.current_user.auth_token)
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.status == 0) {
        this.setState({start_date: null, end_date: null, reason: ""});
        this.refs.forminput.refs.reason = null;
        Alert.alert("Leave was successfully Applied !!");
      }
      if(responseJson.status == 1) {
        Alert.alert(responseJson.reason)
      }
    })
    .catch((error) => {
      Alert.alert("Opps something went wrong - from here !!");
    })
  }

  render() {
    return (
      <Navigator
        renderScene={this.renderScene.bind(this)}
      />
    )
  }

  renderScene(route,navigator) {
    return(
      <Layout title={'Leave Plan'} current_user={this.props.current_user} navigator={this.props.navigator}>
        <Card title={"Leave Application"}>
          <DatePicker
            style={{width: 250}}
            date={this.state.start_date}
            mode="date"
            placeholder="Select From Date"
            format="YYYY-MM-DD"
            minDate={CurrentDate()}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange={(date) => {this.setState({start_date: date})}}
          />
          <DatePicker
            style={{width: 250}}
            date={this.state.end_date}
            mode="date"
            placeholder="Select To Date"
            format="YYYY-MM-DD"
            minDate={this.state.start_date}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange={(date) => {this.setState({end_date: date})}}
          />
          <FormLabel>Reason</FormLabel>
          <FormInput ref='forminput' textInputRef='reason' onChangeText={(reason) => {this.setState({reason: reason})}} />
          <Button title='Apply' onPress={() => this.applyLeave()} />
        </Card>
      </Layout>
    );
  }
}
