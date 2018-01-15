import React, { Component } from 'react';
import { AppRegistry, ActivityIndicator, View } from 'react-native';
import Store from 'react-native-store';
// import Style from './Style';

// var english_german = require('../english_german.json');
import MyList from './MyList'
import Login from './Login';

import { StyleSheet } from 'react-native';

const DB = {
    'credentials': Store.model('credentials'),
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default class Splash extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            loginName: '',
            password: ''
        };
    }

    componentDidMount() {
        this.isAuthorised();
    }

    isAuthorised() {
        try {
            DB.credentials.find().then(value => {
                    console.log("Value from storage: " + values);
                    if (values !== null) {
                        this.setState({
                            loginName: value.loginName,
                            password: value.password
                        });
                        this.navigateToList();
                    }
                });
        } catch (error) {
            console.log(error);
            this.navigateToLogin();
        }
    }

    navigateToList() {
        const { navigate } = this.props.navigation;
        navigate('MyList', { loginName: this.state.loginName, password: this.state.password });
    }

    navigateToLogin() {
        const { navigate } = this.props.navigation;
        navigate('Login', {});
    }


    render() {
        return (
            <View style={styles.container} >
                <ActivityIndicator size="large" />
            </View>
        );
    }
}