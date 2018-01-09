import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'
// tslint:disable-next-line:max-line-length
import { Text, TextInput, View, StyleSheet, Button, ActivityIndicator, Alert, FlatList, TouchableHighlight } from 'react-native'

// Screens

interface LoginScreenProps {
  navigation: any
}
interface LoginScreenStates {
  email: string ,
  password: string,
  rememberMe: boolean,
  rememberMeBox: string,
  isLoading: boolean
}

export default class LoginScreen extends Component<LoginScreenProps, LoginScreenStates> {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      rememberMe: false,
      rememberMeBox: '  ',
      isLoading: false
    }
  }

  _onPressButton() {
    this.setState({isLoading: true})
    return fetch('https://tq-template-node.herokuapp.com/authenticate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        rememberMe: this.state.rememberMe
      })
      }
    ).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.data !== null) {
          this.setState({
            isLoading: false
            // data: responseJson.data // data is being sent to the next screen with navigate
            // name: responseJson.data.user.name
          })
          const { navigate } = this.props.navigation
          navigate('Profile', {data: responseJson.data})
        } else {
          Alert.alert('Wrong Email or Password')
          this.setState({isLoading: false})
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render() {
    if (this.state.isLoading) {
      return(
        <View style = {styles.activity}>
          <ActivityIndicator />
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
            <Text style = {{fontSize: 30, alignContent: 'flex-start'}}>
              Welcome to BestApp
            </Text>
          <TextInput
            style={styles.inputBox}
            placeholder='Email'
            onChangeText={(email) => this.setState({email})}
          />
          <TextInput style={styles.inputBox}
            placeholder='Password'
            secureTextEntry = {true}
            onChangeText={(password) => this.setState({password})}
          />
          <TouchableHighlight
            onPress={() => {
              if (this.state.rememberMe) {
                this.setState({rememberMeBox: '  ', rememberMe: false})
              } else {
                this.setState({rememberMeBox: 'X', rememberMe: true})
              }
            }}
            underlayColor = 'white'>
            <Text style={{padding: 20, alignContent: 'center'}}> Remember me: [{this.state.rememberMeBox}] </Text>
          </TouchableHighlight>
          <Button
            onPress = {() => this._onPressButton()}
            title = 'Login'
            // onPress = {() => navigate('Profile')}
          />
        </View>
      )
    }
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
