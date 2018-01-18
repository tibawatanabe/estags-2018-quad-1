import * as React from 'react';
import { Button, Icon, TextInput, Tile, Text, Title, Divider, Caption, View } from '@shoutem/ui';

import { DefaultScroll } from '../view';

interface DetailProps {
  name: string,
  email: string,
  role: string,
  onReturnPress: () => void,
  onEditPress: () => void,
  onDeletePress: () => void
}

interface EditProps {
  name: string,
  email: string,
  role: string,
  setName: (name) => void,
  setEmail: (email) => void,
  setRole: (role) => void,
  onDonePress: () => void,
  onCancelPress: () => void
}

export class Detail extends React.Component<DetailProps, any> {
  render() {
    return (
      <DefaultScroll>
        <Tile styleName={'text-centric inflexible'}>
          <Icon name="user-profile"/>
          <Title>{this.props.name}</Title>
        </Tile>
        <Divider 
          styleName={'section-header'}
          style={{backgroundColor: 'snow'}}
        >
          <Caption>E-mail</Caption>
          <Text>{this.props.email}</Text>
        </Divider>
        <Divider 
          styleName={'section-header'}
          style={{backgroundColor: 'snow'}}
        >
          <Caption>Role</Caption>
          <Text>{this.props.role}</Text>
        </Divider>
        <Divider styleName="line"/>
        <View styleName="horizontal flexible">
          <Button 
            styleName="full-width"
            onPress={() => this.props.onReturnPress()}
          >
            <Icon name="back"/>
            <Text>Return</Text>
          </Button>
          <Button 
            styleName="full-width"
            onPress={() => this.props.onEditPress()}
          >
            <Icon name="edit"/>
            <Text>Edit</Text>
          </Button>
        </View>
        <Divider styleName="line"/>
        <View styleName="horizontal flexible">
          <Button 
            styleName="full-width"
            style={{backgroundColor: 'snow'}}
            onPress={() => this.props.onDeletePress()}
          >
            <Icon name="clear-text" style={{color: 'red'}}/>
            <Text style={{color: 'red'}}>Delete user</Text>
          </Button>
        </View>
        <Divider styleName="line"/>
      </DefaultScroll>
    );
  }
}


export class EditDetail extends React.Component<EditProps, any> {
  render() {
    return (
      <DefaultScroll>
        <Tile styleName="text-centric">
          <View styleName="horizontal flexible">
            <Icon name="edit"/>
            <Text>Editing</Text>
          </View>
        </Tile>
        <Divider styleName={'section-header'}>
          <Caption>Name</Caption>
        </Divider>
        <TextInput
          placeholder={this.props.name}
          onChangeText={(name) => this.props.setName(name)}
        />
        <Divider styleName={'section-header'}>
          <Caption>E-mail</Caption>
        </Divider>
        <TextInput
          placeholder={this.props.email}
          onChangeText={(email) => this.props.setEmail(email)}
        />
        <Divider styleName={'section-header'}>
          <Caption>Role</Caption>
        </Divider>
        <TextInput
          placeholder={this.props.role}
          onChangeText={(role) => this.props.setRole(role)}
        />
        <Divider styleName="line"/>
        <View styleName="horizontal flexible">
          <Button 
            styleName="full-width"
            onPress={() => this.props.onDonePress()}
          >
            <Icon name="exit-to-app"/>
            <Text>Done</Text>
          </Button>
          <Button 
            styleName="full-width"
            onPress={() => this.props.onCancelPress()}
          >
            <Icon name="close"/>
            <Text>Cancel</Text>
          </Button>
        </View>
        <Divider styleName="line"/>
      </DefaultScroll>
    );
  }
}
