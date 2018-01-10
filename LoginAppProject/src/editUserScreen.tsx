import React, { Component } from 'react'
import axios from 'axios'
// tslint:disable-next-line:max-line-length
import { Text, TextInput, View, StyleSheet, Button, Alert } from 'react-native'

// Screens

interface EditUserScreenProps {
  navigation: any
}
interface EditUserScreenStates {
  name: string,
  email: string
}

export default class EditUserScreen extends Component<EditUserScreenProps, EditUserScreenStates> {
  static navigationOptions = {
    title: 'Edit User'
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
      name: params.name,
      email: params.email
    })
  }

  onPressButton = async () => {
    const {goBack} = this.props.navigation
    const {params} = this.props.navigation.state
    await axios.put(`https://tq-template-node.herokuapp.com/user/${params.id}`,
      {
        email: this.state.email,
        name: this.state.name
      },
      {
        headers: {
          Authorization: `${params.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
    .then(() => {
      params.refreshDetail()
      params.refreshList()
      goBack()
    })
    .catch((error) => {
      Alert.alert('User couldn\'t be edited')
      console.error(error)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Email:</Text>
        <TextInput
          style={styles.inputBox}
          placeholder='Email'
          value = {this.state.email}
          onChangeText={(email) => this.setState({email})}
        />
        <Text>Name:</Text>
        <TextInput style={styles.inputBox}
          placeholder='Name'
          value = {this.state.name}
          onChangeText={(name) => this.setState({name})}
        />
        <Button
          onPress = {this.onPressButton}
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
