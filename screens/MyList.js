import React, { Component } from 'react';
import { AppRegistry, FlatList, View, Text, ListView, TextInput, Button, ToastAndroid, ActivityIndicator } from 'react-native';
import MyListItem from './MyListItem'
import PlantList from './PlanList'
import ScreenTwo from './ScreenTwo'
// import Style from './Style';

// var english_german = require('../english_german.json');
import { StyleSheet } from 'react-native';

var Style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  },
  parent: {
    padding: 16
  },
  germanLabel: {
    marginTop: 20,
    fontWeight: 'bold'
  },
  germanWord: {
    marginTop: 15,
    fontSize: 30,
    fontStyle: 'italic'
  }
});

export default class MyList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      output: '',
      dataArray: new PlantList([]),
      isLoading: true,
    };
  }

  componentDidMount() {
    return fetch('http://10.230.193.91:3000/list')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({
          isLoading: false,
          dataArray: new PlantList(responseJson)
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  static navigationOptions = {
    title: 'List',
  };


  _onPressItem = (item) => {
    this.setState(() => {
      const { navigate } = this.props.navigation;
      navigate('ScreenTwo', { item })
    });
  };

  _renderItem = ({ item }) => (
    <MyListItem
      item={item}
      onPressItem={() => this._onPressItem(item)}
    />
  );

  render() {
    return (
      <FlatList
        data={this.state.dataArray.savedData}
        renderItem={this._renderItem}
      />
    );
  }
}
