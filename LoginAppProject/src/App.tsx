import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'
import { Text, TextInput, View, StyleSheet, Button, ListViewDataSource, ListView, ActivityIndicator, Alert } from 'react-native'

type MyProps = {
}
type MyState = {
  email: string ,
  password: string,
  isLoading: boolean,
  dataSource: ListViewDataSource,
  name: any
}

class LoginScreen extends Component<MyProps, MyState> {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      isLoading: false,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      name: ''
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
        password: this.state.password
      })
      }
    ).then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        if (responseJson.data !== null) {
          this.setState({
            isLoading: false,
            dataSource: ds.cloneWithRows(responseJson.data),
            name: responseJson.data.user.name
          })
          const { navigate } = this.props.navigation
          navigate('Profile', {name: responseJson.data.user.name})
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
        <View style = {{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Text style = {{fontSize: 30}}>
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
          <Button
            onPress = {this._onPressButton.bind(this)}
            title = 'Login'
            // onPress = {() => navigate('Profile')}
          />
        </View>
      )
    }
  }
}

class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Your profile'
  }
  render() {
    const {params} = this.props.navigation.state
    return (
      <View>
        <Text>Welcome {params.name}</Text>
      </View>
    )
  }
}

export default class App extends React.Component {
  render() {
    return <LoginApp />
  }
}

const LoginApp = StackNavigator({
  Home: { screen: LoginScreen },
  Profile: { screen: ProfileScreen }
})

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
  }
})
