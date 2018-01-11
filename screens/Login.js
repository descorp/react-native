import React, { Component } from 'react';
import { AppRegistry, View, Text, TextInput,Alert, Button } from 'react-native';
// import Style from './Style';

// var english_german = require('../english_german.json');
import ScreenTwo from './ScreenTwo'
import MyList from './MyList'
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


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            input: '' ,
            output: '',
            loginName: '',
            loginHint: 'Login',
            password:'',
            passwordHint: 'Password'
        };
    }
    static navigationOptions = {
        title: 'Login',
      };
    
    render() {
        
        return  (
        <View >

    <TextInput
    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
    placeholder={this.state.loginHint}
    onChangeText={(loginName) => this.setState({loginName})}/>
       
    <TextInput
    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
    onChangeText={(text) => this.setState({text})}
    secureTextEntry = {true}
    placeholder={this.state.passwordHint}
    onChangeText={(password) => this.setState({password})}
    /> 

    <Button
    title="Login"
    onPress={this.checkIfTextIsEmpty}
    color="#841584"/>

        </View>);
    }

    checkIfTextIsEmpty = () => {
        const { navigate } = this.props.navigation;
        if (this.state.loginName != '' && this.state.password != '') {
            navigate('MyList', { loginName: this.state.loginName, password: this.state.password })
    } else {
        Alert.alert("Please Enter All the Values.");
    }
}
}