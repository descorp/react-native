import React, { Component } from 'react';
import { AppRegistry, View, Text, Image, DatePickerAndroid, TextInput, Button, ToastAndroid, ActivityIndicator } from 'react-native';
// import Style from './Style';

// var english_german = require('../english_german.json');
import { StyleSheet } from 'react-native';

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        margin: 16
    },
    image: { 
        flex: 1,
        margin: 16 
    },
    welcome: {
        
        fontSize: 20
    }
});

export default class ScreenTwo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: '',
            output: '',
            isLoading: true
        };
    }
    static navigationOptions = {
        title: 'Plant details',
    };

    render() {
        const { params } = this.props.navigation.state;

        const selectedDate = this.state.selectedValue ?
            `You selected ${this.state.selectedValue.toLocaleDateString()}` : ''

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Your plant is  {params.item.name} with id {params.item.id}
                </Text>

                <Image source={{uri: 'http://lorempixel.com/480/760/nature'}}
                    style={styles.image} />

                <Button style={styles.welcome}
                    title="Select the date for plant"
                    onPress={this.showAndroidDatePicker} />

                <Text style={styles.welcome}>
                    {selectedDate}
                </Text>
            </View>
        )
    }
    showAndroidDatePicker = async () => {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: this.state.selectedValue
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                var date = new Date(year, month, day);
                this.setState({ selectedValue: date });
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    };
}