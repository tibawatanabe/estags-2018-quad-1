import * as React from 'react';
import { Button, Icon, Tile, Heading, Divider, Caption, TextInput, Text, View } from '@shoutem/ui';

import { MainView } from '../view/view.style';

interface LoginProps {
  email: string,
  rememberMe: boolean,
  setEmail: (email) => void,
  setPassword: (password) => void,
  rememberMePress: () => void,
  onButtonPress: () => void
}

export class Login extends React.Component<LoginProps, any> {
  render() {
    return (
      <MainView>
        <Tile 
          styleName={'text-centric inflexible'}
          style={{flexDirection: 'row'}}    
        >
          <Heading>Log</Heading>
            <Icon name="linkedin" />
          <Heading>App</Heading>
        </Tile>
        <Divider 
          styleName={'section-header'}
          style={{backgroundColor: 'snow'}}
        >
          <Caption>E-mail</Caption>
        </Divider>
        <TextInput
          returnKeyType='next'
          placeholder={this.props.email}
          onChangeText={(email) => this.props.setEmail(email)}
        />
        <Divider 
          styleName={'section-header'}
          style={{backgroundColor: 'snow'}}
        >
          <Caption>Password</Caption>
        </Divider>
        <TextInput
          placeholder='Type here'
          secureTextEntry
          onChangeText={(password) => this.props.setPassword(password)}
        />
        <Divider styleName="line"/>
        <View 
          style={{
            alignItems: 'flex-end'
          }}
        >
          <Button
            onPress={() => this.props.rememberMePress()}
          >
            <Text>remember me</Text>
            <Icon 
              name={(this.props.rememberMe)
                ? "checkbox-on" : "checkbox-off"}
            />
          </Button>
        </View>
        <Divider styleName="line"/>
        <Button
          style={{backgroundColor: 'snow'}}
          onPress={() => this.props.onButtonPress()}
        >
          <Icon name="turn-off"/>
          <Text>Log in</Text>
        </Button>
        <Divider styleName="line"/>
      </MainView>
    );
  }
}
