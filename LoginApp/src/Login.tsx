import * as React from 'react';
import { Alert } from 'react-native';
import { View, Title, Tile, Text, TextInput, Button } from '@shoutem/ui';
import axios from 'axios';

interface Props {}
interface State {
    email: string,
    password: string,
    rememberMe: boolean
}

export default class Login extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            rememberMe: false
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
                    .then(function (response) {
                        success = true;
                    })
                    .catch(function (error) {
                        Alert.alert('Invalid Email or Password!');
                    })
                    .then(() => {
                        if (success) this.props.onLoginPress();
                    });
    }

    render() {
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
                        onChangeText={(email) => this.setState({email})}
                    />
                    <TextInput
                        placeholder='Password'
                        secureTextEntry
                        onChangeText={(password) => this.setState({password})}
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