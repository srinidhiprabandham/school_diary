import React, { Component } from 'react';

import {
  Card
} from 'react-native-material-design';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Hr from 'react-native-hr';
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
            <Hr lineColor='#b3b3b3' />
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
