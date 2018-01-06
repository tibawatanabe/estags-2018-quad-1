import * as React from 'react';
import { Alert } from 'react-native';
import { View, Title, Tile, Text, TextInput, Button } from '@shoutem/ui';
import axios from 'axios';

import UserInfo from '../artifacts/UserInfo';

interface Props {}
interface State {
    email: string,
    password: string,
    rememberMe: boolean
}

let loggedIn: boolean = false

export default class Login extends React.Component<Props, State> {

    state = {
        email: '',
        password: '',
        rememberMe: false
    }

    async onButtonPress() {
        await axios.post('http://tq-template-node.herokuapp.com/authenticate',
                    {
                        email: this.state.email,
                        password: this.state.password,
                        rememberMe: this.state.rememberMe
                    }
                    )
                    .then(function (response) {
                        loggedIn = true;
                    })
                    .catch(function (error) {
                        Alert.alert('Invalid Email or Password!');
                    });
    }

    render() {
        if (loggedIn === true) {
            return (
                <UserInfo />
            );
        } else {
            return (
                <View>
                    <Tile styleName={'text-centric inflexible'}>
                        <Title>
                            LoginApp
                        </Title>
                    </Tile>
                    <TextInput
                        returnKeyType='next'
                        placeholder='Email'
                        onChangeText={(text) => this.setState({email: text})}
                    />
                    <TextInput
                        placeholder='Password'
                        secureTextEntry
                        onChangeText={(text) => this.setState({password: text})}
                    />
                    <Button
                        disabled={!this.state.email || !this.state.password}
                        onPress={() => this.onButtonPress()}
                    >
                        <Text>Log in</Text>
                    </Button>
                </View>
            );
        }
    }
}