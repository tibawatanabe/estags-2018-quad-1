import React, { Component } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { FormLabel, FormInput, Button } from 'react-native-elements'
import { Container } from 'typedi'
import UserCreateDataSource from '../domain/userCreateUseCase'

const userCreateDataSource = Container.get(UserCreateDataSource)

interface AddUserScreenProps {
  navigation: any
}
interface AddUserScreenStates {
  email: string,
  password: string,
  name: string,
  role: string
}

export default class AddUserScreen extends Component<AddUserScreenProps, AddUserScreenStates> {
  static navigationOptions = {
    title: 'Add New User'
  }
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      name: '',
      role: ''
    }
  }

  onPressButton = async () => {
    const {goBack} = this.props.navigation
    const {params} = this.props.navigation.state
    await userCreateDataSource.createUser(params.token, this.state.email, this.state.password, this.state.name, this.state.role)
    .then(() => {
      params.refresh()
      goBack()
    })
    .catch((error) => {
      console.warn(error)
      Alert.alert('New user couldn\'t be created')
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <FormLabel>Email:</FormLabel>
        <FormInput
          onChangeText = {(email) => this.setState({email})}
          placeholder = 'email@email.com'
        />
        <FormLabel>Password:</FormLabel>
        <FormInput
          onChangeText = {(password) => this.setState({password})}
          secureTextEntry
          placeholder = '••••••••'
        />
        <FormLabel>Name:</FormLabel>
        <FormInput
          onChangeText = {(name) => this.setState({name})}
          placeholder = 'Name'
        />
        <FormLabel>Role:</FormLabel>
        <FormInput
          onChangeText = {(role) => this.setState({role})}
          placeholder = 'admin'
        />
        <View style = {{paddingTop: 10}}>
          <Button
            onPress = {this.onPressButton}
            raised
            backgroundColor = 'lightskyblue'
            title = 'Create new user'
          />
        </View>
      </View>
    )
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
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
