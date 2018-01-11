import * as React from 'react';
import { Alert } from 'react-native';
import { ScrollView, Tile, TextInput, Button, View, Icon, Divider, Caption, Text } from '@shoutem/ui';
import axios from 'axios';

export interface RegProps {
    navigation: any
}
export interface RegState {
    error: boolean,
    name: string,
    email: string,
    password: string,
    role: string
}

export default class UserDetail extends React.Component<RegProps, RegState> {
    static navigationOptions = {
        tabBarLabel: <Icon name="sidebar"/>
    }

    constructor(props) {
        super(props);
        this.state = {
            error: false,
            name: '',
            email: '',
            password: '',
            role: ''
        }
    }

    async onDonePress() {
        let edited = {
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            role: this.state.role
        }
        try {
            await axios.post('http://tq-template-node.herokuapp.com/user',
                edited,
                {   
                    headers: {
                        Authorization: this.props.navigation.state.params.token,
                        'Content-Type': 'application/json'
                    }
                }
            )
            this.setState({name: '', email: '', password: '', role: ''})
            this.props.navigation.goBack()
            this.props.navigation.state.params.refresh(this.props.navigation.state.params.newPage)
        }
        catch (error) {
            this.setState({error: true})
        }
    }

    onCancelPress() {
        this.props.navigation.goBack()
        this.props.navigation.state.params.refresh(this.props.navigation.state.params.page)
    }

    setName(name) {
        this.setState({name: name})
    }

    setEmail(email) {
        this.setState({email: email})
    }
    
    setRole(role) {
        this.setState({role: role})
    }

    setPassword(password) {
        this.setState({password: password})
    }

    render() {
        if (this.state.error) {
            return (
                <View
                    style={{alignItems: 'center',
                            flex: 1,
                            justifyContent: 'space-around',
                            backgroundColor: 'white'}}
                >
                    <Text>Failed to create user!</Text>
                </View>
            );
        } else {
            return (
                <ScrollView 
                    style={{
                        flex: 1,
                        backgroundColor: 'white'
                    }}
                >
                    <Tile styleName="text-centric">
                        <View styleName="horizontal flexible">
                            <Icon name="add-friend"/>
                            <Text>New User</Text>
                        </View>
                    </Tile>
                    <Divider styleName={'section-header'}>
                        <Caption>Name</Caption>
                    </Divider>
                    <TextInput
                        placeholder='Type here'
                        returnKeyType='next'
                        onChangeText={(name) => this.setName(name)}
                    />
                    <Divider styleName={'section-header'}>
                        <Caption>E-mail</Caption>
                    </Divider>
                    <TextInput
                        placeholder='Type here'
                        returnKeyType='next'
                        onChangeText={(email) => this.setEmail(email)}
                    />
                    <Divider styleName={'section-header'}>
                        <Caption>Password</Caption>
                    </Divider>
                    <TextInput
                        secureTextEntry
                        placeholder='Type here'
                        returnKeyType='next'
                        onChangeText={(password) => this.setPassword(password)}
                    />
                    <Divider styleName={'section-header'}>
                        <Caption>Role</Caption>
                    </Divider>
                    <TextInput
                        placeholder='Type here'
                        onChangeText={(role) => this.setRole(role)}
                    />
                    <Divider styleName="line"/>
                    <View styleName="horizontal flexible">
                        <Button 
                            styleName={( 
                                this.state.name === '' || 
                                this.state.email === '' || 
                                this.state.role === '' || 
                                this.state.password === ''
                            ) ? "full-width muted" : "full-width"}
                            disabled= {( 
                                this.state.name === '' || 
                                this.state.email === '' || 
                                this.state.role === '' || 
                                this.state.password === ''
                            ) ? true : false}
                            onPress={() => this.onDonePress()}
                        >
                            <Icon name="exit-to-app"/>
                            <Text>Done</Text>
                        </Button>
                        <Button 
                            styleName="full-width"
                            onPress={() => this.onCancelPress()}
                        >
                            <Icon name="close"/>
                            <Text>Cancel</Text>
                        </Button>
                    </View>
                </ScrollView>
            );
        } 
    }
}