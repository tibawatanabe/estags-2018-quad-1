import * as React from 'react';
import { AppRegistry } from 'react-native';

import Login from '../artifacts/Login';
import UserInfo from '../artifacts/UserInfo';

interface Props {}
interface State {
    loggedIn: boolean
}

export default class LoginApp extends React.Component<Props, State> {
    state = {
        loggedIn: false
    }
    
    render() {
        if (this.state.loggedIn) {
            return (
                <UserInfo
                    onLogoutPress={() => this.setState({loggedIn: false})}
                />
            );
        } else {
            return (
                <Login
                    onLoginPress={() => this.setState({loggedIn: true})}
                />
            );
        }
    }
}

AppRegistry.registerComponent('Test', () => LoginApp);