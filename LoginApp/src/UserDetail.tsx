import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import { ScrollView, Tile, Title, TextInput, Button, View, Icon, Divider, Caption, Text } from '@shoutem/ui';
import axios from 'axios';

export interface DetailProps {
    navigation: any
}
export interface DetailState {
    loading: boolean,
    editing: boolean,
    data: any,
    error: boolean,
    name: string,
    email: string,
    role: string
}

export default class UserDetail extends React.Component<DetailProps, DetailState> {
    static navigationOptions = {
        tabBarLabel: <Icon name="sidebar"/>
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            editing: false,
            data: {},
            error: false,
            name: '',
            email: '',
            role: ''
        }
    }

    async getUser() {
        let param = this.props.navigation.state.params.id;
        try {
            let response = await axios.get('http://tq-template-node.herokuapp.com/user/'+param,
                            {   
                                headers: {
                                    Authorization: this.props.navigation.state.params.token
                                }
                            })
            let data = response.data.data;
            this.setState({loading: false, data: data})
        }
        catch (error) {
            this.setState({loading: false, error: true})
        }
    }

    async onDonePress() {
        let edited = {
            name: (this.state.name != '') ? this.state.name : this.state.data.name,
            email: (this.state.email != '') ? this.state.email : this.state.data.email,
            role: (this.state.role != '') ? this.state.role : this.state.data.role
        }
        let param = this.props.navigation.state.params.id;
        try {
            await axios.put('http://tq-template-node.herokuapp.com/user/'+param,
                edited,
                {   
                    headers: {
                        Authorization: this.props.navigation.state.params.token,
                        'Content-Type': 'application/json'
                    },
                }
            )
            this.setState({editing: false, loading: true, name: '', email: '', role: ''});
        }
        catch (error) {
            this.setState({loading: true, error: true, editing: false})
        }
    }

    async onDeletePress() {
        let param = this.props.navigation.state.params.id;
        try {
            await axios.delete('http://tq-template-node.herokuapp.com/user/'+param,
                {   
                    headers: {
                        Authorization: this.props.navigation.state.params.token
                    },
                }
            )
            this.props.navigation.navigate('UserList')
        }
        catch (error) {
            this.setState({loading: true, error: true, editing: false})
        }
    }

    onEditPress() {
        this.setState({editing: true})
    }

    onCancelPress() {
        this.setState({editing: false, name: '', email: '', role: ''})
    }

    onReturnPress() {
        this.props.navigation.navigate('UserList')
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
        if (this.state.loading) {
            this.getUser();
            return (
                <View
                    style={{alignItems: 'center',
                            flex: 1,
                            justifyContent: 'space-around',
                            backgroundColor: 'white'}}
                >
                    <ActivityIndicator 
                        animating={true}
                    />
                </View>
            );
        } else if (this.state.error) {
            return (
                <View
                    style={{alignItems: 'center',
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
                        placeholder={this.state.data.name}
                        onChangeText={(name) => this.setName(name)}
                    />
                    <Divider styleName={'section-header'}>
                        <Caption>E-mail</Caption>
                    </Divider>
                    <TextInput
                        placeholder={this.state.data.email}
                        onChangeText={(email) => this.setEmail(email)}
                    />
                    <Divider styleName={'section-header'}>
                        <Caption>Role</Caption>
                    </Divider>
                    <TextInput
                        placeholder={this.state.data.role}
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
                    <View styleName="horizontal flexible">
                        <Button 
                            styleName="full-width"
                            onPress={() => this.onDeletePress()}
                        >
                            <Icon name="clear-text" style={{color: 'red'}}/>
                            <Text style={{color: 'red'}}>Delete user</Text>
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
                        <Icon name="user-profile"/>
                        <Title>{this.state.data.name}</Title>
                    </Tile>
                    <Divider styleName={'section-header'}>
                        <Caption>E-mail</Caption>
                        <Text>{this.state.data.email}</Text>
                    </Divider>
                    <Divider styleName={'section-header'}>
                        <Caption>Role</Caption>
                        <Text>{this.state.data.role}</Text>
                    </Divider>
                    <Divider styleName="line"/>
                    <View styleName="horizontal flexible">
                        <Button 
                            styleName="full-width"
                            onPress={() => this.onReturnPress()}
                        >
                            <Icon name="back"/>
                            <Text>Return</Text>
                        </Button>
                        <Button 
                            styleName="full-width"
                            onPress={() => this.onEditPress()}
                        >
                            <Icon name="edit"/>
                            <Text>Edit</Text>
                        </Button>
                    </View>
                    <Divider styleName="line"/>
                </ScrollView>
            );
        }
    }
}