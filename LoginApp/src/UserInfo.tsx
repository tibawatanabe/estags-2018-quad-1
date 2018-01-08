import * as React from 'react';
import { TabNavigator } from 'react-navigation';
import { ScrollView, Divider, Caption, View, Tile, Title, Text, Button } from '@shoutem/ui';

import List from '../artifacts/List';

interface Props {}
interface State {}

class LoggedUser extends React.Component<Props, State> {
    static navigationOptions = {
        tabBarLabel: 'My account'
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView style={{flex: 1}}>
                <Tile styleName={'text-centric inflexible'}>
                        <Title>
                            LoginApp
                        </Title>
                </Tile>
                <Divider styleName={'section-header'}>
                    <Caption>E-mail</Caption>
                </Divider>
                <View style={{alignItems: 'center'}}>
                    <Text>{this.props.navigation.state.params.email}</Text>
                </View>
                <Divider styleName={'section-header'}>
                </Divider>
                <View>
                    <Button
                        onPress={() => this.props.navigation.navigate('Login')}
                    >
                        <Text>Log out</Text>
                    </Button>
                </View>
            </ScrollView>
        );
    }
}

export default UserInfo = TabNavigator({
    List: {
        screen: List
    },
    Me: {
        screen: LoggedUser
    },
}, {
    tabBarPosition: 'bottom'
});