import React, { Component } from 'react'
// tslint:disable-next-line:max-line-length
import { Text, View, StyleSheet, ActivityIndicator, FlatList, TouchableHighlight } from 'react-native'
import axios from 'axios'
interface ProfileScreenProps {
  navigation: any
}
interface ProfileScreenStates {
  isLoading: boolean,
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
      page: 1,
      totalPages: 100,
      data: []
    }
  }

  loadMore() {
    console.warn(this.state.page)
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
        data: this.state.data.concat(responseJson.data.data),
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
        <View>
          <Text style = {{alignContent: 'center'}}>Welcome {params.data.user.name}</Text>
          <Text>These are the users in the server database</Text>
          <FlatList
            data = {this.state.data}
            renderItem = {({item}) =>
              <TouchableHighlight
                onPress={() => navigate('Detail', {id: item.id, token: params.data.token})}
                underlayColor = 'white'>
                <Text style = {{padding: 25}}> {item.name} </Text>
              </TouchableHighlight>
            }
            keyExtractor={(item) => item.id}
            onEndReached={() => this.loadMore()}
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
