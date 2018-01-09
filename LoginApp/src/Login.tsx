import * as React from 'react';
import { Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { View, Heading, Icon, Tile, Caption, Divider, Text, TextInput, Button } from '@shoutem/ui';
import axios from 'axios';

import UserInfo from '../artifacts/UserInfo';

interface Props {}
interface State {
    email: string,
    password: string,
    rememberMe: boolean
    data: any
}

class LoginScreen extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            rememberMe: false,
            data: {}
        }
    }

    onButtonPress() {
        let success = false;
        axios.post('http://tq-template-node.herokuapp.com/authenticate',
                    {
                        email: this.state.email,
                        password: this.state.password,
                        rememberMe: this.state.rememberMe
                    },
                    { headers: 
                        {'Content-Type': 'application/json' }
                    })
                    .then( (response) => {
                        this.setState({data: response.data});
                        success = true;
                    })
                    .catch( (error) => {
                        Alert.alert('Invalid Email or Password!');
                    })
                    .then(() => {
                        if (success) {
                            this.props.navigation.navigate('Logged', 
                                { 
                                    data: this.state.data.data
                                });
                        }
                    });
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

export default Login = StackNavigator({
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