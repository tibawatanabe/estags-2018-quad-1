import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'
// tslint:disable-next-line:max-line-length
import {StyleSheet} from 'react-native'
import LoginScreen from './loginScreen'
import ProfileScreen from './profileScreen'
import DetailScreen from './detailScreen'
import AddUserScreen from './addUserScreen'
import EditUserScreen from './editUserScreen'

export default class App extends React.Component {
  render() {
    return <LoginApp />
  }
}

// Screen Manager
// tslint:disable-next-line:variable-name LoginApp must start with upper case to be called as a function
const LoginApp = StackNavigator({
  Home: { screen: LoginScreen },
  Profile: { screen: ProfileScreen },
  Detail: { screen: DetailScreen },
  AddUser: { screen: AddUserScreen},
  EditUser: { screen: EditUserScreen}
})

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputBox: {
    height: 40,
    width: 200
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  },
  activity: {
    flex: 1,
    paddingTop: 20
  }
})