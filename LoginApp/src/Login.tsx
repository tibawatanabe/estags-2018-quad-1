import * as React from 'react';
import { Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { View, Heading, Icon, Tile, Caption, Divider, Text, TextInput, Button } from '@shoutem/ui';
import axios from 'axios';

import UserInfo from '../artifacts/UserInfo';

export interface LoginProps {
    navigation: any
}
export interface LoginState {
    email: string,
    password: string,
    rememberMe: boolean
    data: any
}
export interface Props {}
export interface State {}

class LoginScreen extends React.Component<LoginProps, LoginState> {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            rememberMe: false,
            data: {}
        }
    }

    async onButtonPress() {
        try {
            let response = await axios.post('http://tq-template-node.herokuapp.com/authenticate',
                            {
                                email: this.state.email,
                                password: this.state.password,
                                rememberMe: this.state.rememberMe
                            },
                            { headers: 
                                {'Content-Type': 'application/json' }
                            });
            this.setState({data: response.data});
            this.props.navigation.navigate('Logged', 
                                { 
                                    data: this.state.data.data
                                });
        }
        catch (error) {
            Alert.alert('Invalid Email or Password!');
        }
    }

    render() {
        return (
                <View 
                    style={{
                        flex: 1,
                        backgroundColor: 'white'
                    }}
                >
                    <Tile 
                        styleName={'text-centric inflexible'}
                        style={{flexDirection: 'row'}}    
                    >
                        <Heading>Log</Heading>
                        <Icon name="linkedin" />
                        <Heading>App</Heading>
                    </Tile>
                    <Divider styleName={'section-header'}>
                        <Caption>E-mail</Caption>
                    </Divider>
                    <TextInput
                        returnKeyType='next'
                        placeholder='Type here'
                        onChangeText={(email) => this.setState({email})}
                    />
                    <Divider styleName={'section-header'}>
                        <Caption>Password</Caption>
                    </Divider>
                    <TextInput
                        placeholder='Type here'
                        secureTextEntry
                        onChangeText={(password) => this.setState({password})}
                    />
                    <Divider styleName="line"/>
                    <Button
                        onPress={() => this.onButtonPress()}
                    >
                        <Text>Log in</Text>
                    </Button>
                    <Divider styleName="line"/>
                </View>
        );
    }
}

const LoginNav = StackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            header: null
        }
    },
    Logged: {
        screen: UserInfo,
        navigationOptions: {
            header: null
        }
    }
});

export default class Login extends React.Component<Props, State> {
    render() {
        return (
            <LoginNav/>
        );
    }
}