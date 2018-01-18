import * as React from 'react';
import { Alert } from 'react-native';
import { Icon } from '@shoutem/ui';
import { Container } from 'typedi';

import { UserUseCase } from '../domain';
import { DetailState } from '../interfaces';
import { Loading, Error, Detail, EditDetail } from '../../components/screen';

export class UserDetail extends React.Component<any, DetailState> {
  static navigationOptions = {
    tabBarLabel: <Icon name="sidebar"/>
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      editing: false,
      user: null,
      error: false,
      name: '',
      email: '',
      role: ''
    }
  }

  async getUser() {
    let id = this.props.navigation.state.params.id;
    try {
      let response = await Container.get(UserUseCase).get(id);
      let data = response.data;
      this.setState({loading: false, user: data})
    }
    catch (error) {
      this.setState({loading: false, error: true})
    }
  }

  async onDonePress() {
    let user = this.state.user;
    try {
      await Container.get(UserUseCase).update(user, this.state);
      this.setState({editing: false, loading: true, name: '', email: '', role: ''});
    }
    catch (error) {
      this.setState({loading: true, error: true, editing: false})
    }
  }

  async deleteUser() {
    let id = this.props.navigation.state.params.id;
    try {
      await Container.get(UserUseCase).delete(id);
      this.navigateBack()
    }
    catch (error) {
      this.setState({loading: true, error: true, editing: false})
    }
  }
  
  navigateBack() {
    this.props.navigation.goBack();
    this.props.navigation.state.params.refresh(this.props.navigation.state.params.page);
  }

  onDeletePress() {
    Alert.alert(
      'Delete user',
      'Delete '+this.state.user.name+' from list?',
      [
        {text: 'Yes', onPress: () => this.deleteUser(), },
        {text: 'No'}
      ]
    )
  }

  onEditPress() {
    this.setState({editing: true})
  }

  onCancelPress() {
    this.setState({editing: false, name: '', email: '', role: ''})
  }

  onReturnPress() {
    this.navigateBack()
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

  render() {
    if (this.state.loading) {
      this.getUser();
      return <Loading />
    } else if (this.state.error) {
      return <Error />
    } else if (this.state.editing) {
      return (
        <EditDetail 
          name={this.state.user.name}
          email={this.state.user.email}
          role={this.state.user.role}
          setName={(name) => this.setName(name)}
          setEmail={(email) => this.setEmail(email)}
          setRole={(role) => this.setRole(role)}
          onDonePress={() => this.onDonePress()}
          onCancelPress={() => this.onCancelPress()}
        />
      );
    } else {
      return (
        <Detail 
          name={this.state.user.name}
          email={this.state.user.email}
          role={this.state.user.role}
          onReturnPress={() => this.onReturnPress()}
          onEditPress={() => this.onEditPress()}
          onDeletePress={() => this.onDeletePress()}
        />
      );
    }
  }
}