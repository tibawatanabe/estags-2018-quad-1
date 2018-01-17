import { StackNavigator } from 'react-navigation';
import { LoginScreen } from '../login';
import { UserInfoNav } from './tabs-navigator';

import { loginNavigation } from './login-navibar';


export const LoginNav = StackNavigator({
    Login: {
      screen: LoginScreen,
      navigationOptions: loginNavigation
    },
    Logged: {
      screen: UserInfoNav,
      navigationOptions: loginNavigation
    }
});
