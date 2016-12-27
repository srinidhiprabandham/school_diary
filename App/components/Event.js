import React, { Component } from 'react';

import {
  Card
} from 'react-native-material-design';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { FormatEvent, GenerateEventStyle } from '../utils/HelperFunctions.js';

export default class Event extends Component {
  render() {
    var FormattedEvent = FormatEvent(this.props.evnt);
    var CardCss = GenerateEventStyle(FormattedEvent.color);
    return(
      <View style={CardCss}>
        <Card>
          <Card.Body>
            <Text>{FormattedEvent.event_name}</Text>
            <Text>Starts at: {FormattedEvent.from}</Text>
            <Text>Ends at: {FormattedEvent.to}</Text>
          </Card.Body>
        </Card>
      </View>
    )
  }
}


var styles = StyleSheet.create({
});
