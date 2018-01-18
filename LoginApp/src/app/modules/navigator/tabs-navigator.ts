import { TabNavigator } from 'react-navigation';
import { LoggedUser } from '../info';
import { ListNav } from './list-navigator';
import { tabsBar } from './tabs-navibar'

export const UserInfoNav = TabNavigator(
  {
    List: {
      screen: ListNav
    },
    Me: {
      screen: LoggedUser
    },
  }, 
  {
    tabBarOptions: tabsBar
  }
);