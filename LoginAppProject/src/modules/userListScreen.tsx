import React, { Component } from 'react'
// tslint:disable-next-line:max-line-length
import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import { PageLoaderFactory } from '../domain/pageLoader'
import { ModelType } from '../model/modelType'
import { ListItem, Button } from 'react-native-elements'
import { Service, Container, Inject } from 'typedi'

interface UserListScreenProps {
  navigation: any
}
interface UserListScreenStates {
  isLoading: boolean,
  isRefreshing: boolean,
  userListLoader: any
}

export default class UserListScreen extends Component <UserListScreenProps, UserListScreenStates> {
  static navigationOptions = {
    title: 'Your profile'
  }

  pageListLoader = new PageLoaderFactory

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      isRefreshing: false,
      userListLoader: this.pageListLoader.build(ModelType.User)
    }
  }
  loadMore = () => {
    this.state.userListLoader.loadMore().then(() => {
      this.setState({userListLoader: this.state.userListLoader})
    })
  }

  loadPageZero() {
    this.state.userListLoader.getPage(0)
    .then(() => {
      this.setState({
        isLoading: false,
        isRefreshing: false
      })
    })
    .catch((error) => {
      console.error(error)
    })
  }

  componentDidMount() {
    const {params} = this.props.navigation.state
    this.state.userListLoader.setToken(params.data.token)
    this.loadPageZero()
  }

  pullRefresh = () => {
    this.setState({
      isRefreshing: true
    })
    this.state.userListLoader.reset()
    this.loadPageZero()
  }

  refresh = () => {
    this.state.userListLoader.reset()
    this.loadPageZero()
  }

  render() {
    const {navigate} = this.props.navigation
    const {params} = this.props.navigation.state
    if (this.state.isLoading) {
      return(
       <View style = {styles.activity}>
            <ActivityIndicator />
        </View>
      )
    } else {
      // console.warn(this.state.list)
      return (
        <View style = {styles.container}>
          <View style = {{paddingTop: 40}}>
            <FlatList
              data = {this.state.userListLoader.data}
              keyExtractor={(item) => item.id}
              renderItem = {({item}) =>
                <ListItem
                  title = {item.name}
                  subtitle = {item.email}
                  onPress={() => navigate('Detail', {id: item.id, token: params.data.token, refresh: this.refresh})}
                  underlayColor = 'white'
                />
              }
              onEndReached={this.loadMore}
              refreshing = {this.state.isRefreshing}
              onRefresh = {this.pullRefresh}
            />
          </View>
          <View style = {{paddingBottom: 40}}>
            <Button
              title = 'Add user'
              raised
              icon = {{name: 'user-plus', type: 'font-awesome'}}
              onPress = {() => navigate('AddUser', {token: params.data.token, refresh: this.refresh})}
              backgroundColor = 'lightskyblue'
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
    justifyContent: 'center',
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
