import * as React from 'react';
import { AppRegistry } from 'react-native';

import Login from '../artifacts/Login';

interface Props {}
interface State {}

export default class LoginApp extends React.Component<Props, State> {
    render() {
        return (
            <Login />
        );
    }
}

AppRegistry.registerComponent('Test', () => LoginApp);