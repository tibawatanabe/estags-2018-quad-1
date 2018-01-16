import React, { Component } from 'react'
// tslint:disable-next-line:max-line-length
import { Text, View, Alert } from 'react-native'
import { Card, Button } from 'react-native-elements'
import UserDetailUseCase from '../domain/userDetailUseCase'
import {Container} from 'typedi'
import User from '../model/user'

const userDetailUseCase = Container.get(UserDetailUseCase)

interface DetailScreenProps {
  navigation: any
}
interface DetailScreenStates {
  user: any,
  isLoading: boolean
}

export default class DetailScreen extends Component <DetailScreenProps, DetailScreenStates> {
  static navigationOptions = {
    title: `User description`
  }
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      isLoading: false
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    const {params} = this.props.navigation.state
    userDetailUseCase.getDetail(params.token, params.id)
    .then((userDetail) => {
      this.setState({
        isLoading: false,
        user: userDetail
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
    userDetailUseCase.delete(params.token, params.id)
    .then(() => {
      Alert.alert(`User: ${this.state.user.name} deleted`)
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
        <Card title = {`${this.state.user.name}`}>
          <Text> Name: {this.state.user.name} </Text>
          <Text> Email: {this.state.user.email} </Text>
          <Text> Id: {params.id} </Text>
          <Button
            title = 'Edit'
            color = 'lightskyblue'
            icon = {{name: 'pencil-square-o', type: 'font-awesome', color: 'lightskyblue'}}
            transparent
            onPress = {() => navigate('EditUser',
            {
              refreshDetail: this.refresh,
              refreshList: params.refresh,
              token: params.token,
              id: params.id,
              name: this.state.user.name,
              email: this.state.user.email
            })}
          />
        </Card>
        <View style = {{paddingTop: 20}}>
        <Button
          title = 'Delete!'
          raised
          onPress = {() => {
            this.deleteUser()
            params.refresh()
            goBack()
          }}
          backgroundColor = 'red'
        />
        </View>
      </View>
    )
  }
}
