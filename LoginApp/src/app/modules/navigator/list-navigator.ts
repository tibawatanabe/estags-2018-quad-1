import { StackNavigator } from 'react-navigation';
import { UserList } from '../list';
import { UserDetail } from '../detail';
import { UserReg } from '../reg';

export const ListNav = StackNavigator({
    UserList: {
        screen: UserList,
        navigationOptions: {
            header: null
        }
    },
    Detail: {
        screen: UserDetail,
        navigationOptions: {
            header: null
        }
    },
    Create: {
        screen: UserReg,
        navigationOptions: {
            header: null
        }
    }
});
