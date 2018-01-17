import 'reflect-metadata';

import { LoginNav } from './app/modules/navigator/login-navigator';

import * as React from 'react';
import { AppRegistry } from 'react-native';

export default class LoginApp extends React.Component<any, any> {
    render() {
      return (
        <LoginNav />
      );
    }
}

AppRegistry.registerComponent('Test', () => LoginApp);