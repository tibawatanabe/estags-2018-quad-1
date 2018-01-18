import * as React from 'react';
import { Icon } from '@shoutem/ui';
import { Container } from 'typedi';

import { UserRegState } from '../interfaces';
import { UserUseCase } from '../domain';
import { Error, Reg } from '../../components/screen';

export class UserReg extends React.Component<any, UserRegState> {
  static navigationOptions = {
    tabBarLabel: <Icon name="sidebar"/>
  }

  constructor(props) {
    super(props);
    this.state = {
      error: false,
      name: '',
      email: '',
      password: '',
      role: ''
    }
  }

  async onDonePress() {
    try {
      Container.get(UserUseCase).create(this.state);
      this.setState({name: '', email: '', password: '', role: ''});
      this.navigateBack(this.props.navigation.state.params.newPage);
    }
    catch (error) {
      this.setState({error: true})
    }
  }

  navigateBack(page) {
    this.props.navigation.goBack()
    this.props.navigation.state.params.refresh(page)
  }

  onCancelPress() {
    this.navigateBack(this.props.navigation.state.params.page);
  }

  setName(name) {
    this.setState({name: name})
  }

  setEmail(email) {
    this.setState({email: email})
  }
    
  setRole(role) {
    this.setState({role: role})
  }

  setPassword(password) {
    this.setState({password: password})
  }

  hasBlank():boolean {
    return (
      (this.state.name === '' || 
      this.state.email === '' || 
      this.state.role === '' || 
      this.state.password === '') 
      ? true : false 
    );
  }

  render() {
    if (this.state.error) {
      return <Error />
    } else {
      return (
        <Reg
          setName={(name) => this.setName(name)}
          setEmail={(email) => this.setEmail(email)}
          setPassword={(password) => this.setPassword(password)}
          setRole={(role) => this.setRole(role)}
          blank={this.hasBlank()}
          onDonePress={() => this.onDonePress()}
          onCancelPress={() => this.onCancelPress()}
        />
      );
    } 
  }
}