import React, { Component } from 'react'
import axios from 'axios'
// tslint:disable-next-line:max-line-length
import { Text, TextInput, View, StyleSheet, Alert } from 'react-native'
import { FormLabel, FormInput, Button } from 'react-native-elements'
import UserEditUseCase from '../domain/userEditUseCase'
import User from '../model/user'
import { Container } from 'typedi'

const userEditUserCase = Container.get(UserEditUseCase)

interface EditUserScreenProps {
  navigation: any
}
interface EditUserScreenStates {
  name: string,
  email: string
}

export default class EditUserScreen extends Component<EditUserScreenProps, EditUserScreenStates> {
  static navigationOptions = {
    title: 'Edit user'
  }
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: ''
    }
  }

  componentWillMount() {
    const {params} = this.props.navigation.state
    this.setState({
      name: params.user.name,
      email: params.user.email
    })
  }

  onPressButton = () => {
    const {goBack} = this.props.navigation
    const {params} = this.props.navigation.state
    userEditUserCase.editUser(params.token, params.user.id, this.state.email, this.state.name)
    .then(() => {
      params.refreshDetail()
      params.refreshList()
      goBack()
    })
    .catch((error) => {
      Alert.alert('User couldn\'t be edited')
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <FormLabel>Email:</FormLabel>
        <FormInput
          onChangeText = {(email) => this.setState({email})}
          // onChangeText = {(prevEmail) => this.setState(
          //   (prevState) => ({
          //     user: Object.assign({}, prevState.user, {
          //       email: prevEmail
          //     })
          //   })
          // )
          value = {this.state.email}
          placeholder = 'email@email.com'
        />
        <FormLabel>Name:</FormLabel>
        <FormInput
          onChangeText = {(name) => this.setState({name})}
          value = {this.state.name}
          placeholder = 'Name'
        />
        <Button
          onPress = {this.onPressButton}
          rounded
          containerViewStyle = {{paddingTop: 10}}
          backgroundColor = 'lightskyblue'
          title = 'Save changes'
        />
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
