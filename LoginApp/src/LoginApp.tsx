import * as React from 'react';
import { AppRegistry } from 'react-native';
import { ScrollView, Title, Tile, Text, TextInput, Button } from '@shoutem/ui'

export default class LoginApp extends React.Component {
    render() {
           return (
            <ScrollView>
                <Tile styleName={'text-centric inflexible'}>
                    <Title>
                        LoginApp
                    </Title>
                </Tile>
                <TextInput
                    placeholder='Email'
                />
                <TextInput
                    placeholder='Password'
                    secureTextEntry
                />
                <Button>
                    <Text>Log in</Text>
                </Button>
            </ScrollView>
        );
    }
}

AppRegistry.registerComponent('Test', () => LoginApp);