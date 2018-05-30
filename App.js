import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation'
import Login from './src/screens/Login'

const MainNavigator = createStackNavigator({
  Home: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  // DeckView: {
  //   screen: DeckView,
  //   navigationOptions: {
  //     title: 'Deck Info',
  //     headerTintColor: white,
  //     headerStyle: {
  //       backgroundColor: purple
  //     }
  //   }
  // }
})

export default class App extends React.Component {
  render() {
    return (
      <MainNavigator/>
    );
  }
}


