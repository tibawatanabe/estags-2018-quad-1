import * as React from 'react';

import { Alert } from 'react-native';
import { Container } from 'typedi';

import { LoginState } from '../interfaces';
import { LoginUseCase } from '../domain';
import { Login } from '../../components/screen';

export class LoginScreen extends React.Component<any, LoginState> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      rememberMe: false,
      data: {}
    }
  }

  componentWillMount() {
    this.getRememberMe();
  }

  async getRememberMe() {
    try {
      let rememberMe = await Container.get(LoginUseCase).getRememberMe();
      this.setState({rememberMe: rememberMe});
      if(this.state.rememberMe) {
        let email = await Container.get(LoginUseCase).getEmail();
        this.setState({email: email})
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  
  async onButtonPress() {
    if(this.state.rememberMe === true) {
      try {
        Container.get(LoginUseCase).setEmail(this.state.email);
      }
      catch (error) {
        console.log(error)
      }
    } else {
      try {
        Container.get(LoginUseCase).deleteEmail();
      }
      catch (error) {
        console.log(error)
      }
    }
    try {
      let loginUseCase = Container.get(LoginUseCase);
      let data = await loginUseCase.execute(this.state.email, this.state.password, this.state.rememberMe);
      this.setState({data: data});
      this.navigateToList();
    }
    catch (error) {
      Alert.alert('Invalid Email or Password!');
    }
  }

  async rememberMePress() {
    try {
      Container.get(LoginUseCase).setRememberMe(this.state.rememberMe);
      if (this.state.rememberMe) {
        Container.get(LoginUseCase).deleteEmail();
      }
      this.setState({rememberMe: !this.state.rememberMe});
    }
    catch (error) {
      console.log(error)
    }
  }

  navigateToList = () => {
    this.props.navigation.navigate('Logged', 
      { 
        data: this.state.data.data
      }
    );
  }

  setEmail(email) {
    this.setState({email});
  }

  setPassword(password) {
    this.setState({password});
  }

  render() {
    return (
      <Login 
        email={(this.state.email !== '') ? this.state.email : 'Type here'}
        rememberMe={this.state.rememberMe}
        setEmail={(email) => this.setEmail(email)}
        setPassword={(password) => this.setPassword(password)}
        rememberMePress={() => this.rememberMePress()}
        onButtonPress={() => this.onButtonPress()}
      />
    );
  }
}
