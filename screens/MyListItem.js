import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import {
  StyleSheet
} from 'react-native';

import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';

const styles = StyleSheet.create({
  body: {
    margin: 4,
  },
  container: {
    flex: 1,
  },
  title: {
    flex: 1,
    fontSize: 18,
    backgroundColor: 'transparent'
  },
  plant_date: {
    flex: 1,
    alignItems: 'stretch',
    marginTop: 5,
    fontSize: 12,
    backgroundColor: 'transparent'
  },
  button: {
    marginRight: 10
  }
});

export default class MyListItem extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  _onPress = () => {
    this.props.onPressItem(this.props.item.id);
  };

  render() {
    console.log(this.props)
    return (
      <TouchableOpacity style={styles.body} onPress={this._onPress}>
        <Card>
          <CardTitle>
            <View style={styles.container}> 
              <Text style={styles.title}>  Plant named "{this.props.item.name}" </Text>
              <Text style={styles.plant_date} >  The last day is {this.props.item.wateringDays[0]} </Text>
            </View>
          </CardTitle>
        </Card>
      </TouchableOpacity>
    );
  }
}