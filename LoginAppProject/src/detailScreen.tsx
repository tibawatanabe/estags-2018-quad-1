import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'
// tslint:disable-next-line:max-line-length
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native'
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

  render() {
    const {params} = this.props.navigation.state
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
