import React, { Component } from 'react'
// tslint:disable-next-line:max-line-length
import { Text, View, TouchableHighlight, Alert } from 'react-native'
import axios from 'axios'

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
    axios.get(`https://tq-template-node.herokuapp.com/user/${params.id}`,
      {
        headers: {Authorization: `${params.token}`}
      }
    )
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        name: responseJson.data.data.name,
        email: responseJson.data.data.email
      })
    })
    .catch((error) => {
      console.error(error)
    })
  }

  refresh = () => {
    this.componentDidMount()
  }

  async deleteUser() {
    const { params } = this.props.navigation.state
    await axios.delete(`https://tq-template-node.herokuapp.com/user/${params.id}`,
      {
        headers: { Authorization: `${params.token}`}
      }
    )
    .then(() => {
      Alert.alert(`User: ${this.state.name} deleted`)
    })
    .catch((error) => {
      console.error(error)
    })
  }

  render() {
    const {params} = this.props.navigation.state
    const {goBack} = this.props.navigation
    const {navigate} = this.props.navigation
    return(
      <View>
        <Text> Name: {this.state.name} </Text>
        <Text> Email: {this.state.email} </Text>
        <Text> Id: {params.id} </Text>
        <TouchableHighlight
          style = {{backgroundColor: 'skyblue'}}
          underlayColor = 'powderblue'
          onPress = {() => navigate('EditUser',
          {
            refreshDetail: this.refresh,
            refreshList: params.refresh,
            token: params.token,
            id: params.id,
            name: this.state.name,
            email: this.state.email
          })}
        >
          <Text> Edit </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style = {{backgroundColor: 'red'}}
          underlayColor = 'crimson'
          onPress = {() => {
            this.deleteUser()
            params.refresh()
            goBack()
          }}
        >
          <Text> Delete! </Text>
        </TouchableHighlight>
      </View>
    )
  }
}
