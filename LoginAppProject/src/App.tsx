import React, { Component } from 'react'
import { Text, TextInput, View, StyleSheet, Button, ListViewDataSource, ListView, ActivityIndicator, Alert } from 'react-native'

type MyProps = {}
type MyState = {
  email: string ,
  password: string,
  isLoading: boolean,
  doneLoading: boolean,
  dataSource: ListViewDataSource,
  name: any
}

export default class LoginApp extends Component<MyProps, MyState> {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      isLoading: false,
      doneLoading: false,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      name: ''
    }
  }

  _onPressButton() {
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
            doneLoading: true,
            dataSource: ds.cloneWithRows(responseJson.data),
            name: responseJson.data.user.name
          })
        } else {
          Alert.alert('Wrong Email/Password')
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
    } else if (this.state.doneLoading) {
      console.warn(this.state.dataSource)
      return(
        <View style = {{padding: 10}}>
          <Text> Welcome {this.state.name} </Text>
        </View>
        /*
        <ListView
          dataSource={this.state.dataSource}
          renderRow = {(rowData) => <Text> {rowData.token} </Text>}
        /> */
      )
    } else {
      return (
        <View style={styles.container}>
          <Text style = {{fontSize: 30}}>
            Welcome to BestApp
          </Text>
          <TextInput
            style={{height: 40, width: 200}}
            placeholder='Email'
            onChangeText={(email) => this.setState({email})}
          />
          <TextInput style={{height: 40, width: 200}}
            placeholder='Password'
            secureTextEntry = {true}
            onChangeText={(password) => this.setState({password})}
          />
          <Button
             onPress = {this._onPressButton.bind(this)}
            title = 'Login'
          />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
})
