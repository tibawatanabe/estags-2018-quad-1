import React, { Component } from 'react'
import axios from 'axios'
// tslint:disable-next-line:max-line-length
import { Text, TextInput, View, StyleSheet, Button, ActivityIndicator, Alert, TouchableWithoutFeedback } from 'react-native'

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

  async onPressButton() {
    this.setState({isLoading: true})
    await axios.post('https://tq-template-node.herokuapp.com/authenticate',
      {
        email: this.state.email,
        password: this.state.password,
        rememberMe: this.state.rememberMe
      },
      {
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        }
      }
    )
    .then((responseJson) => {
      this.setState({
        isLoading: false
        // data: responseJson.data // data is being sent to the next screen with navigate
        // name: responseJson.data.user.name
      })
      const { navigate } = this.props.navigation
      navigate('Profile', {data: responseJson.data.data})
    })
    .catch((error) => {
      Alert.alert('Wrong Email or Password')
      console.error(error)
      this.setState({isLoading: false})
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
          <View style= {{flexDirection: 'column', alignItems: 'flex-end'}}>
            <Text style = {{fontSize: 30}}>Welcome</Text>
            <Text style = {{fontSize: 30}}>to</Text>
            <Text style = {{fontSize: 30}}>BestApp</Text>
          </View>
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
          <TouchableWithoutFeedback
            onPress={() => {
              if (this.state.rememberMe) {
                this.setState({rememberMeBox: '  ', rememberMe: false})
              } else {
                this.setState({rememberMeBox: 'X', rememberMe: true})
              }
            }}
          >
            <View>
              <Text style={{padding: 20, alignContent: 'center'}}> Remember me: [{this.state.rememberMeBox}] </Text>
            </View>
          </TouchableWithoutFeedback>
          <Button
            onPress = {this.onPressButton.bind(this)}
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
