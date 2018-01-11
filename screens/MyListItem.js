import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

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
        <TouchableOpacity onPress={this._onPress}>
          <View>
            <Text>
              {this.props.item.name}, {this.props.item.wateringDays[0]}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  }