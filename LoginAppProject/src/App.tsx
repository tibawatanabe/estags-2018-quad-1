import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'
// tslint:disable-next-line:max-line-length
import LoginScreen from './loginScreen'
import ProfileScreen from './profileScreen'
import DetailScreen from './detailScreen'
import AddUserScreen from './addUserScreen'
import EditUserScreen from './editUserScreen'

export default class App extends Component {
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
