import * as React from 'react';
import { Icon } from '@shoutem/ui';
import { Container } from 'typedi';

import { UserInfoState } from '../interfaces/user.interfaces';
import { Error } from '../../components/screen/error-screen';
import { Info, EditInfo } from '../../components/screen/user-screen';
import { UserUseCase } from '../domain/user.use-case';

export class LoggedUser extends React.Component<any, UserInfoState> {
  static navigationOptions = {
    tabBarLabel: <Icon name="user-profile"/>
  }

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      error: false,
      edited: false,
      name: '',
      email: '',
      role: ''
    }
  }
  
  async onDonePress() {
    let user = this.props.navigation.state.params.data.user
    try {
      Container.get(UserUseCase).update(user, this.state);
      this.setState({edited: true, editing: false});
    }
    catch (error) {
      this.setState({error: true, editing: false})
    }
  }

  onEditPress() {
    this.setState({editing: true})
  }

  onCancelPress() {
    this.setState({editing: false, name: '', email: '', role: ''})
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

  navigateToLogin = () => {
    this.props.navigation.navigate('Login');
  }

  render() {
    const user = this.props.navigation.state.params.data.user;
    if (this.state.error) {
      return <Error />
    } else if (this.state.editing) {
      return (
        <EditInfo
          name={(this.state.edited && this.state.name !== '') ? this.state.name : user.name}
          email={(this.state.edited && this.state.email !== '') ? this.state.email : user.email}
          role={(this.state.edited && this.state.role !== '') ? this.state.role : user.role}
          setName={(name) => this.setName(name)}
          setEmail={(email) => this.setEmail(email)}
          setRole={(role) => this.setRole(role)}
          onDonePress={() => this.onDonePress()}
          onCancelPress={() => this.onCancelPress()}
        />
      );
    } else {
      return (
        <Info 
          name={(this.state.edited && this.state.name !== '') ? this.state.name : user.name}
          email={(this.state.edited && this.state.email !== '') ? this.state.email : user.email}
          role={(this.state.edited && this.state.role !== '') ? this.state.role : user.role}
          onEditPress={() => this.onEditPress()}
          navigate={() => this.navigateToLogin()}
        />
      );
    }
  }
}
