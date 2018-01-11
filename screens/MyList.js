import React, { Component } from 'react';
import { AppRegistry, Keyboard, FlatList, View, Text, ListView, TextInput, Button, ToastAndroid, RefreshControl } from 'react-native';
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

  _fetchDataFromAPI() {
    return fetch('http://192.168.2.29:3000/list')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({
          isLoading: false,
          dataArray: new PlantList(responseJson)
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false
        });
        console.error(error);
      });
  }

  componentDidMount() {
    Keyboard.dismiss;
    this._fetchDataFromAPI()
  }

  static navigationOptions = {
    title: 'List',
  };

  _onRefresh() {
    this.setState({isLoading: true});
    this._fetchDataFromAPI();
  }

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
      <View> 
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={this.state.isLoading}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
        data={this.state.dataArray.savedData}
        renderItem={this._renderItem}
      />
      </View>
    );
  }
}
