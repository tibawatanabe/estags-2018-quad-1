import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'
import axios from 'axios'
// tslint:disable-next-line:max-line-length
import { Text, TextInput, View, StyleSheet, Button, ActivityIndicator, Alert, TouchableWithoutFeedback } from 'react-native'

// Screens

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
    await axios.post('https://tq-template-node.herokuapp.com/user',
      {
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
        role: this.state.role
      },
      {
        headers: {
          Authorization: `${params.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
    .then((responseJson) => {
      params.refresh()
      goBack()
    })
    .catch((error) => {
      Alert.alert('New user couldnt be created')
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Email:</Text>
        <TextInput
          style={styles.inputBox}
          placeholder='Email'
          onChangeText={(email) => this.setState({email})}
        />
        <Text>Password:</Text>
        <TextInput style={styles.inputBox}
          placeholder='Password'
          onChangeText={(password) => this.setState({password})}
        />
        <Text>Name:</Text>
        <TextInput style={styles.inputBox}
          placeholder='Name'
          onChangeText={(name) => this.setState({name})}
        />
        <Text>Role:</Text>
        <TextInput style={styles.inputBox}
          placeholder='admin'
          onChangeText={(role) => this.setState({role})}
        />
        <Button
          onPress = {this.onPressButton}
          title = 'Create new user'
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
