import React, { Component } from 'react';
import { AppRegistry, View, Text,ListView, DatePickerAndroid, TextInput, Button,ToastAndroid, ActivityIndicator } from 'react-native';
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

export default class ScreenTwo extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            input: '' ,
            output: '',
            isLoading: true
        };
    }
    static navigationOptions = {
        title: 'Screen Two',
      };
      
      componentDidMount() {
        return fetch('http://10.230.193.91:3000/list')
          .then((response) => response.json())
          .then((responseJson) => {
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) =>
                 r1 !== r2});
                 console.log(responseJson)
            this.setState({
                isLoading: false,
              dataSource: ds.cloneWithRows(responseJson),
            }, function() {
              // do something with new state
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }

    render() {
        const { params } = this.props.navigation.state;    
        if (this.state.isLoading) {
            return (
              <View style={{flex: 1, paddingTop: 20}}>
                <ActivityIndicator />
              </View>
            );
          }
          const selectedDate = this.state.selectedValue ? 
          `You selected ${this.state.selectedValue.toLocaleDateString()}`  : ''

        return (
            <View >
                <Text  style = {Style.welcome}>
                  Your plant is  {params.item.name} with id {params.item.id}
                </Text>

                <Button
                title="Click me"
                onPress={this.showAndroidDatePicker}
                color="#841584"/>

            
                <Text  style = {Style.welcome}>
                { selectedDate }
                </Text> 
              
                <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData.name}, {rowData.wateringDays[0]}</Text>}
        />

            </View>
      )    
 }
 showAndroidDatePicker = async () => {
  try {
      const {action, year, month, day} = await DatePickerAndroid.open({
          date: this.state.selectedValue
      });
      if (action !== DatePickerAndroid.dismissedAction) {
          var date = new Date(year, month, day);
          this.setState({selectedValue: date});
      }
  } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
  }
};
}