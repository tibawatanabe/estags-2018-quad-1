import * as React from 'react';
import { TabNavigator } from 'react-navigation';
import { ScrollView, Divider, Caption, Icon, View, Tile, Title, Text, Button } from '@shoutem/ui';

import List from '../artifacts/List';

interface Props {}
interface State {}

class LoggedUser extends React.Component<Props, State> {
    static navigationOptions = {
        tabBarLabel: <Icon name="user-profile"/>
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView 
                style={{
                    flex: 1,
                    backgroundColor: 'white'
                }}
            >
                <Tile styleName={'text-centric inflexible'}>
                        <Title>
                            Welcome, {this.props.screenProps.user.name}
                        </Title>
                </Tile>
                <Divider styleName={'section-header'}>
                    <Caption>E-mail</Caption>
                    <Text>{this.props.screenProps.user.email}</Text>
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

const UserInfoNav = TabNavigator({
    List: {
        screen: List
    },
    Me: {
        screen: LoggedUser
    },
}, {
    tabBarOptions: {
        activeTintColor: 'black',
        inactiveTintColor: 'white',
        style: {
            backgroundColor: 'snow'
        },
        indicatorStyle: {
            backgroundColor: 'black'
        }
    }
});

export default class UserInfo extends React.Component<Props, State> {
    render() {
        return (
            <UserInfoNav 
                screenProps={this.props.navigation.state.params.data}
            />
        );
    }
}