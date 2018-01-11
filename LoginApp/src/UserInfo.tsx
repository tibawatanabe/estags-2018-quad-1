import * as React from 'react';
import { TabNavigator } from 'react-navigation';
import { ScrollView, TextInput, Divider, Caption, Icon, View, Tile, Title, Text, Button } from '@shoutem/ui';
import axios from 'axios';

import List from '../artifacts/List';

export interface InfoProps {
    navigation: any
}
export interface InfoState {}
export interface UserProps {
    screenProps: any
}
export interface UserState {
    editing: boolean,
    error: boolean,
    edited: boolean,
    name: string,
    email: string,
    role: string
}

class LoggedUser extends React.Component<UserProps, UserState> {
    static navigationOptions = {
        tabBarLabel: <Icon name="user-profile"/>
    }

    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            error: false,
            edited: false,
            name: '',
            email: '',
            role: ''
        }
    }

    async onDonePress() {
        let edited = {
            name: (this.state.name != '') ? this.state.name : this.props.screenProps.state.params.data.user.name,
            email: (this.state.email != '') ? this.state.email : this.props.screenProps.state.params.data.user.email,
            role: (this.state.role != '') ? this.state.role : this.props.screenProps.state.params.data.user.role
        }
        let param = this.props.screenProps.state.params.data.user.id
        try {
            await axios.put('http://tq-template-node.herokuapp.com/user/'+param,
                edited,
                {   
                    headers: {
                        Authorization: this.props.screenProps.state.params.data.token,
                        'Content-Type': 'application/json'
                    },
                }
            )
            this.setState({edited: true, editing: false});
        }
        catch (error) {
            this.setState({error: true, editing: false})
        }
    }

    onEditPress() {
        this.setState({editing: true})
    }

    onCancelPress() {
        this.setState({editing: false, name: '', email: '', role: ''})
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

    render() {
        if (this.state.error) {
            return (
                <View
                    style={{
                        alignItems: 'center',
                        flex: 1,
                        justifyContent: 'space-around',
                        backgroundColor: 'white'}}
                >
                    <Text>Failed to load content!</Text>
                </View>
            );
        } else if (this.state.editing) {
            return (
                <ScrollView 
                    style={{
                        flex: 1,
                        backgroundColor: 'white'
                    }}
                >
                    <Tile styleName="text-centric">
                        <View styleName="horizontal flexible">
                            <Icon name="edit"/>
                            <Text>Editing</Text>
                        </View>
                    </Tile>
                    <Divider styleName={'section-header'}>
                        <Caption>Name</Caption>
                    </Divider>
                    <TextInput
                        placeholder={ (this.state.edited && this.state.name !== '') ? 
                            this.state.name : this.props.screenProps.state.params.data.user.name}
                        onChangeText={(name) => this.setName(name)}
                    />
                    <Divider styleName={'section-header'}>
                        <Caption>E-mail</Caption>
                    </Divider>
                    <TextInput
                        placeholder={ (this.state.edited && this.state.email !== '') ? 
                            this.state.email : this.props.screenProps.state.params.data.user.email}
                        onChangeText={(email) => this.setEmail(email)}
                    />
                    <Divider styleName={'section-header'}>
                        <Caption>Role</Caption>
                    </Divider>
                    <TextInput
                        placeholder={ (this.state.edited && this.state.role !== '') ? 
                            this.state.role : this.props.screenProps.state.params.data.user.role}
                        onChangeText={(role) => this.setRole(role)}
                    />
                    <Divider styleName="line"/>
                    <View styleName="horizontal flexible">
                        <Button 
                            styleName="full-width"
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
                    <Divider styleName="line"/>
                </ScrollView>
            );
        } else {
            return (
                <ScrollView 
                    style={{
                        flex: 1,
                        backgroundColor: 'white'
                    }}
                >
                    <Tile styleName={'text-centric inflexible'}>
                        <Title>
                            Welcome, { (this.state.edited && this.state.name !== '') ? 
                                this.state.name : this.props.screenProps.state.params.data.user.name}
                        </Title>
                    </Tile>
                    <Divider 
                        styleName={'section-header'}
                        style={{backgroundColor: 'snow'}}
                    >
                        <Caption>E-mail</Caption>
                        <Text>{ (this.state.edited && this.state.email !== '') ? 
                            this.state.email : this.props.screenProps.state.params.data.user.email}</Text>
                    </Divider>
                    <Divider 
                        styleName={'section-header'}
                        style={{backgroundColor: 'snow'}}
                    >
                        <Caption>Role</Caption>
                        <Text>{ (this.state.edited && this.state.role !== '') ? 
                            this.state.role : this.props.screenProps.state.params.data.user.role}</Text>
                    </Divider>
                    <Divider styleName="line"/>
                    <View styleName="horizontal flexible">
                        <Button 
                            styleName="full-width"
                            onPress={() => this.onEditPress()}
                        >
                            <Icon name="edit"/>
                            <Text>Edit</Text>
                        </Button>
                    </View>
                    <View>
                        <Button
                            style={{backgroundColor: 'snow'}}
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