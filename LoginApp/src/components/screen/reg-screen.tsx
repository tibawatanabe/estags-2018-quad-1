import * as React from 'react';
import { Button, Icon, Tile, Divider, Caption, TextInput, Text, View } from '@shoutem/ui';

import { DefaultScroll } from '../view/scroll.style';

interface RegProps {
  setName: (name) => void,
  setEmail: (email) => void,
  setPassword: (password) => void,
  setRole: (role) => void,
  blank: boolean,
  onDonePress: () => void,
  onCancelPress: () => void
}

export class Reg extends React.Component<RegProps, any> {
  render() {
    return (
      <DefaultScroll>
        <Tile styleName="text-centric">
          <View styleName="horizontal flexible">
            <Icon name="add-friend"/>
            <Text>New User</Text>
          </View>
        </Tile>
        <Divider 
          styleName={'section-header'}
          style={{backgroundColor: 'snow'}}
        >
          <Caption>Name</Caption>
        </Divider>
        <TextInput
          placeholder='Type here'
          returnKeyType='next'
          onChangeText={(name) => this.props.setName(name)}
        />
        <Divider 
          styleName={'section-header'}
          style={{backgroundColor: 'snow'}}
        >
          <Caption>E-mail</Caption>
        </Divider>
        <TextInput
          placeholder='Type here'
          returnKeyType='next'
          onChangeText={(email) => this.props.setEmail(email)}
        />
        <Divider 
          styleName={'section-header'}
          style={{backgroundColor: 'snow'}}    
        >
          <Caption>Password</Caption>
        </Divider>
        <TextInput
          secureTextEntry
          placeholder='Type here'
          returnKeyType='next'
          onChangeText={(password) => this.props.setPassword(password)}
        />
        <Divider 
          styleName={'section-header'}
          style={{backgroundColor: 'snow'}}
        >
          <Caption>Role</Caption>
        </Divider>
        <TextInput
          placeholder='Type here'
          onChangeText={(role) => this.props.setRole(role)}
        />
        <Divider styleName="line"/>
        <View styleName="horizontal flexible">
          <Button 
            style={{backgroundColor: 'snow'}}
            styleName={(this.props.blank) ? "full-width muted" : "full-width"}
            disabled={(this.props.blank) ? true : false}
            onPress={() => this.props.onDonePress()}
          >
            <Icon name="exit-to-app"/>
            <Text>Done</Text>
          </Button>
          <Button 
            style={{backgroundColor: 'snow'}}
            styleName="full-width"
            onPress={() => this.props.onCancelPress()}
          >
            <Icon name="close"/>
            <Text>Cancel</Text>
          </Button>
        </View>
      </DefaultScroll>
    );
  }
}
