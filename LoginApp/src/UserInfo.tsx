import * as React from 'react';
import { TabNavigator } from 'react-navigation';
import { ScrollView, Divider, Caption, Icon, View, Tile, Title, Text, Button } from '@shoutem/ui';

import List from '../artifacts/List';

export interface InfoProps {
    navigation: any
}
export interface InfoState {}
export interface UserProps {
    screenProps: any
}
export interface UserState {}

class LoggedUser extends React.Component<UserProps, UserState> {
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
                            Welcome, {this.props.screenProps.state.params.data.user.name}
                        </Title>
                </Tile>
                <Divider 
                    styleName={'section-header'}
                    style={{backgroundColor: 'snow'}}
                >
                    <Caption>E-mail</Caption>
                    <Text>{this.props.screenProps.state.params.data.user.email}</Text>
                </Divider>
                <Divider 
                    styleName={'section-header'}
                    style={{backgroundColor: 'snow'}}
                >
                    <Caption>Role</Caption>
                    <Text>{this.props.screenProps.state.params.data.user.role}</Text>
                </Divider>
                <Divider styleName="line"/>
                <View>
                    <Button
                        onPress={() => this.props.screenProps.navigate('Login')}
                    >
                        <Text>Log out</Text>
                        <Icon name="exit-to-app"/>
                    </Button>
                </View>
                <Divider styleName="line"/>
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

export default class UserInfo extends React.Component<InfoProps, InfoState> {
    render() {
        return (
            <UserInfoNav 
                screenProps={this.props.navigation}
            />
        );
    }
}