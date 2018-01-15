import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Login from './Login';
import ScreenTwo from './ScreenTwo';
import MyList from './MyList';
import Splash from './Splash';
import { StackNavigator } from 'react-navigation';
// import Style from './Style';

// var english_german = require('../english_german.json');

const App = StackNavigator({
  Splash: { screen: Splash },
  Login: { screen: Login },
  MyList: { screen: MyList },
  ScreenTwo: { screen: ScreenTwo }
});

export default class AppMain extends Component {
  render() {
    return <App />;
  }
}