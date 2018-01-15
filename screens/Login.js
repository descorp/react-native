import React, { Component } from 'react';
import { AppRegistry, View, Text, TextInput, Alert, Button } from 'react-native';
import Store from 'react-native-store';
// import Style from './Style';

// var english_german = require('../english_german.json');
import MyList from './MyList'
import { TextField } from 'react-native-material-textfield';

import { StyleSheet } from 'react-native';

const DB = {
    'credentials': Store.model('credentials'),
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 16
    },
    input_text: {
        fontSize: 16,
    },

    button_text: {
        fontSize: 16,
        margin: 16,
    }
});

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            output: '',
            loginName: '',
            loginHint: 'Login',
            password: '',
            passwordHint: 'Password'
        };
    }

    async isAuthorised() {
        try {
          var values = await DB.credentials.findById(0);
          console.log("Value from storage: " + value);
          return values !== null && values.length > 0;
        } catch (error) {
          console.log(error);
          return false; 
        }
    }

    render() {

        return (
            <View style={styles.container}>

                <TextField style={styles.input_text}
                    label='Login'
                    onChangeText={(loginName) => this.setState({ loginName })} />

                <TextField style={styles.input_text}
                    secureTextEntry={true}
                    label='Password'
                    onChangeText={(password) => this.setState({ password })}
                />

                <Button
                    title="Login"
                    onPress={this.tryLogin} />
            </View>
        );
    }

    saveCredentials(login, password) {
        return DB.credentials.add({
            login: login,
            password: password
        });
    }

    onLoginFailure() {
        Alert.alert('Selected user and password not registered');
    }

    login(login, password) {
        var credentials = JSON.stringify({
            login: login,
            password: password,
        });
        return fetch('http://10.230.192.164:3000/login', {
            method: 'POST',
            body: credentials
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.saveCredentials(login, password)
                .then(()=> {
                  const { navigate } = this.props.navigation;
                  navigate('MyList', { loginName: this.state.loginName, password: this.state.password });
                });
            }).catch((error) => {
                console.error(error);
                this.onLoginFailure();
            });
    }

    tryLogin = () => {
        if (this.state.loginName != '' && this.state.password != '') {
            this.login(this.state.loginName, this.state.password);
        } else {
            Alert.alert("Please Enter All the Values.");
        }
    }
}