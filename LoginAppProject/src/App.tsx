import React, { Component } from 'react'
import { Text, TextInput, View, StyleSheet, Button, Alert } from 'react-native'

type MyProps = {}
type MyState = { user: string , password: string}

export default class PizzaTranslator extends Component<MyProps, MyState> {
  constructor(props) {
    super(props)
    this.state = {user: '',
                  password: ''}
  }

  _onPressButton() {
    Alert.alert('do something')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style = {{fontSize: 30}}>
          Welcome to BestApp
        </Text>
        <TextInput
          style={{height: 40, width: 200}}
          placeholder='User'
          onChangeText={(user) => this.setState({user})}
        />
        <TextInput style={{height: 40, width: 200}}
          placeholder='Password'
          secureTextEntry = {true}
          onChangeText={(password) => this.setState({password})}
        />
        <Button
          onPress = {this._onPressButton}
          title = 'Login'
        />
      </View>
    )
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
