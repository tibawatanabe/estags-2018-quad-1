import React, { Component } from 'react'
// tslint:disable-next-line:max-line-length
import { Text, View, StyleSheet, ActivityIndicator, FlatList, TouchableHighlight } from 'react-native'
import axios from 'axios'
import { ListItem, List, Button } from 'react-native-elements'
interface ProfileScreenProps {
  navigation: any
}
interface ProfileScreenStates {
  isLoading: boolean,
  isRefreshing: boolean,
  page: number,
  totalPages: number,
  data: any
}

export default class ProfileScreen extends Component <ProfileScreenProps, ProfileScreenStates> {
  static navigationOptions = {
    title: 'Your profile'
  }
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      isRefreshing: false,
      page: 1,
      totalPages: 100,
      data: []
    }
  }

  loadMore = () => {
    if (this.state.page < this.state.totalPages) {
      this.setState({page: this.state.page + 1})
      this.loadPage(this.state.page)
    }
  }

  loadPage(page: number) {
    const {params} = this.props.navigation.state
    axios.get(`https://tq-template-node.herokuapp.com/users?pagination={"page": ${page} , "window": 10}`,
      {
        headers: {
          Authorization: `${params.data.token}`
        }
      }
    )
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        isRefreshing: false,
        data: page === 0 ? responseJson.data.data : this.state.data.concat(responseJson.data.data),
        totalPages: responseJson.data.pagination.totalPages
      })
    })
    .catch((error) => {
      console.error(error)
    })
  }

  componentDidMount() {
    this.loadPage(0)
  }

  pullRefresh = () => {
    this.setState({
      page: 1,
      isRefreshing: true
    })
    this.loadPage(0)
  }

  refresh = () => {
    this.setState({
      page: 1
    })
    this.loadPage(0)
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
              data = {this.state.data}
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
