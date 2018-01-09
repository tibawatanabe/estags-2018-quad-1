import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'
// tslint:disable-next-line:max-line-length
import { Text, TextInput, View, StyleSheet, Button, ListViewDataSource, ListView, ActivityIndicator, Alert, FlatList, TouchableHighlight } from 'react-native'

// Screens

type LoginScreenProps = {
  navigation: any
}
type LoginScreenStates = {
  email: string ,
  password: string,
  isLoading: boolean,
  dataSource: ListViewDataSource,
  name: any
}

class LoginScreen extends Component<LoginScreenProps, LoginScreenStates> {
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

type ProfileScreenProps = {
  navigation: any
}
type ProfileScreenStates = {
  isLoading: boolean,
  list: any
}

class ProfileScreen extends Component <ProfileScreenProps, ProfileScreenStates> {
  static navigationOptions = {
    title: 'Your profile'
  }
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      list: []
    }
  }

  componentDidMount() {
    return fetch('https://facebook.github.io/react-native/movies.json')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        list: responseJson.movies
      }, function() {
        // do something with new state
      })
    })
    .catch((error) => {
      console.error(error)
    })
  }

  render() {
    const {navigate} = this.props.navigation
    const {params} = this.props.navigation.state
    if (this.state.isLoading) {
      return(
       <View style = {{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
        </View>
      )
    } else {
      // console.warn(this.state.list)
      return (
        <View>
          <Text>Welcome {params.data.user.name}</Text>
          <Text>These are the movies you watched last month</Text>
          <FlatList
            data = {this.state.list}
            renderItem = {({item}) =>
            <TouchableHighlight
              onPress={() => navigate('Description', {data: item})}
              underlayColor = 'white'>
              <Text style={{padding: 20}}> {item.title} </Text>
          </TouchableHighlight>}
          />
        </View>
      )
    }
  }
}

type DescriptionScreenProps = {
  navigation: any
}
type DescriptionScreenStates = {
}

class DescriptionScreen extends Component <DescriptionScreenProps, DescriptionScreenStates> {
  static navigationOptions = {
    title: `Movie description`
  }

  render() {
    const {params} = this.props.navigation.state
    return(
      <View>
        <Text> Title: {params.data.title} </Text>
        <Text> Release date: {params.data.releaseYear} </Text>
      </View>
    )
  }
}

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
  Description: { screen: DescriptionScreen }
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
  }
})
