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
        margin: 16,
    },
  title: {
    textAlign: 'left',
    fontSize: 18,
    backgroundColor: 'transparent'
  },
  plant_date: {
    textAlign: 'left',
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
          <Text style={styles.title}>  Your plant {this.props.item.name} </Text>         
        </CardTitle>
          <CardContent>
           <Text style={styles.plant_date}>  The last day is {this.props.item.wateringDays[0]} </Text>
           </CardContent>
        </Card>
        </TouchableOpacity>
      );
    }
  }