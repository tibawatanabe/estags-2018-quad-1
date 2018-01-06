import * as React from 'react';
import { AppRegistry } from 'react-native';

import Login from '../artifacts/Login';



export default class LoginApp extends React.Component {
    render() {
           return (
                <Login />
        );
    }
}

AppRegistry.registerComponent('Test', () => LoginApp);