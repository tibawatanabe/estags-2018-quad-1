import React, { Component } from 'react'
import {FormLabel, FormInput, CheckBox, Button} from 'react-native-elements'
import LoginUseCase from '../domain/loginUseCase'
// tslint:disable-next-line:max-line-length
import { Text, View, StyleSheet, ActivityIndicator, Alert } from 'react-native'
import { Container, Inject } from 'typedi'

// Screens
interface LoginScreenProps {
  navigation: any
}
interface LoginScreenStates {
  email: string ,
  password: string,
  rememberMe: boolean,
  isLoading: boolean,
}

export default class LoginScreen extends Component<LoginScreenProps, LoginScreenStates> {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      rememberMe: false,
      isLoading: false
    }
  }

  onPressButton = () => {
    this.setState({isLoading: true})
    let login = Container.get(LoginUseCase)
    login.authentication(this.state.email, this.state.password, this.state.rememberMe)
    .then((responseJson) => {
      this.setState({
        isLoading: false
      })
      this.props.navigation.navigate('Profile', {data: responseJson.data.data})
    })
    .catch(() => {
      Alert.alert('Wrong Email or Password')
      // console.error(error)
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
          <View style= {{flexDirection: 'column', alignItems: 'center'}}>
            <View style={{alignItems: 'flex-end'}}>
              <Text style = {{fontSize: 30}}>Welcome</Text>
              <Text style = {{fontSize: 30}}>to</Text>
              <Text style = {{fontSize: 30}}>BestApp</Text>
            </View>
          </View>
          <FormLabel>Email:</FormLabel>
          <FormInput
            onChangeText = {(email) => this.setState({email})}
          />
          <FormLabel>Password:</FormLabel>
          <FormInput
            onChangeText = {(password) => this.setState({password})}
            secureTextEntry = {true}
          />
          <CheckBox
            title = 'Remember me'
            checked = {this.state.rememberMe}
            onPress = {() => {this.setState({rememberMe: !this.state.rememberMe})}}
            containerStyle = {{backgroundColor: 'rgba(52, 52, 52, 0)'}}
          />
          <View style = {{alignItems: 'center'}}>
          <Button
              onPress = {this.onPressButton}
              title = 'Login'
              rounded
              backgroundColor = 'lightskyblue'
              containerViewStyle = {{width: 200}}
              // onPress = {() => navigate('Profile')}
            />
          </View>
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
