import * as React from 'react';
import { Alert, AsyncStorage } from 'react-native';
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

    componentWillMount() {
        this.getEmail();
        this.getRememberMe();
    }

    async getRememberMe() {
        try {
            const saved = await AsyncStorage.getItem('rememberMe');
            let rememberMe = (saved === 'true') ?  true : false;
            this.setState({rememberMe: rememberMe})
        }
        catch (error) {
            console.log(error)
        }
    }

    async getEmail() {
        try {
            const saved = await AsyncStorage.getItem('email');
            let email = (saved !== null) ?  saved : '';
            this.setState({email: email})
        }
        catch (error) {
            console.log(error)
        }
    }

    async onButtonPress() {
        if(this.state.rememberMe === true) {
            try {
                await AsyncStorage.setItem('email', this.state.email);
            }
            catch (error) {
                console.log(error)
            }
        } else {
            try {
                await AsyncStorage.removeItem('email')
            }
            catch (error) {
                console.log(error)
            }
        }
        try {
            let response = await axios.post('http://tq-template-node.herokuapp.com/authenticate',
                            {
                                email: this.state.email,
                                password: this.state.password,
                                rememberMe: this.state.rememberMe
                            },
                            { 
                                headers: 
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

    async rememberMe() {
        if(this.state.rememberMe === false) {
            try {
                await AsyncStorage.setItem('rememberMe', 'true');
                this.setState({rememberMe: true})
            }
            catch (error) {
                console.log(error)
            }
        } else {
            try {
                await AsyncStorage.setItem('rememberMe', 'false');
                this.setState({rememberMe: false})
            }
            catch (error) {
                console.log(error)
            }
        }
    }

    setEmail(email) {
        this.setState({email});
    }

    setPassword(password) {
        this.setState({password});
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
                        placeholder={(this.state.email !== '')
                            ? this.state.email : 'Type here' }
                        onChangeText={(email) => this.setEmail(email)}
                    />
                    <Divider styleName={'section-header'}>
                        <Caption>Password</Caption>
                    </Divider>
                    <TextInput
                        placeholder='Type here'
                        secureTextEntry
                        onChangeText={(password) => this.setPassword(password)}
                    />
                    <Divider styleName="line"/>
                    <View 
                        style={{
                            alignItems: 'flex-end'
                        }}
                    >
                        <Button
                            onPress={() => this.rememberMe()}
                        >
                            <Text>remember me</Text>
                            <Icon 
                                name={(this.state.rememberMe)
                                    ? "checkbox-on" : "checkbox-off"}
                            />
                        </Button>
                    </View>
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