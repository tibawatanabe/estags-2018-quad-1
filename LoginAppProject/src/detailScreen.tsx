import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'
// tslint:disable-next-line:max-line-length
import { Text, TextInput, View, StyleSheet, Button, ActivityIndicator, Alert, FlatList, TouchableHighlight } from 'react-native'

interface DetailScreenProps {
  navigation: any
}
interface DetailScreenStates {
  name: string,
  email: string,
  isLoading: boolean
}

export default class DetailScreen extends Component <DetailScreenProps, DetailScreenStates> {
  static navigationOptions = {
    title: `User description`
  }
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      isLoading: false
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    const {params} = this.props.navigation.state
    return fetch(`https://tq-template-node.herokuapp.com/user/${params.id}`, {
      method: 'GET',
      headers: {Authorization: `${params.token}`}
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        name: responseJson.data.name,
        email: responseJson.data.email
      })
    })
    .catch((error) => {
      console.error(error)
    })
  }

  render() {
    const {params} = this.props.navigation.state
    return(
      <View>
        <Text> Name: {this.state.name} </Text>
        <Text> Email: {this.state.email} </Text>
        <Text> Id: {params.id} </Text>
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
