import React, { Component } from 'react';
import { AppRegistry, View, Text, TextInput, Alert, Button } from 'react-native';
// import Style from './Style';

// var english_german = require('../english_german.json');
import ScreenTwo from './ScreenTwo'
import MyList from './MyList'
import { TextField } from 'react-native-material-textfield';

import { StyleSheet } from 'react-native';


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
    static navigationOptions = {
        title: 'Login',
    };

    render() {

        return (
            <View style={styles.container}>

                <TextField style={styles.input_text}
                    label='Login'
                    onChangeText={(loginName) => this.setState({ loginName })} />

                <TextField style={styles.input_text}
                    onChangeText={(text) => this.setState({ text })}
                    secureTextEntry={true}
                    label='Password'
                    onChangeText={(password) => this.setState({ password })}
                />

                <Button
                    title="Login"
                    onPress={this.checkIfTextIsEmpty} />

            </View>
        );
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