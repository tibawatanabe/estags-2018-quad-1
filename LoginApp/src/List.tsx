import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { ScrollView, Button, TouchableOpacity, ListView, Icon, Row, Text, Divider, View } from '@shoutem/ui';
import axios from 'axios';

import UserDetail from '../artifacts/UserDetail';

export interface UListProps {
    screenProps: any,
    navigation: any
}
export interface UListState {
    loading: boolean,
    list: any,
    error: boolean
}
export interface ListProps {
    screenProps: any,
}
export interface Props {}
export interface State {}

class PageButton extends React.Component<Props, State> {
    render() {
        return (
            <View styleName="horizontal flexible">
                <Button styleName="full-width muted">
                    <Icon name="left-arrow"/>
                    <Text>Previous</Text>
                </Button>
                <Button styleName="full-width muted">
                    <Text>Next</Text>
                    <Icon name="right-arrow"/>                    
                </Button>
            </View>
        );
    }
}

class UserList extends React.Component<UListProps, UListState> {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            list: [],
            error: false
        }
    }
    async componentWillMount() {
        let data = [];
        let pagination={
            page: 1,
            window: 10
        };
        try {
            let response = await axios.get('http://tq-template-node.herokuapp.com/users',
                            {   
                                headers: {
                                    Authorization: this.props.screenProps.state.params.data.token
                                },
                                params: {
                                    pagination: pagination
                                }
                            })
            data = response.data.data;
            pagination= response.data.pagination;
            this.setState({loading: false, list: data})
        }
        catch (error) {
            this.setState({loading: false, error: true})
        }
    }

    renderItem = ({name, email, role}) => {
        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Detail',
                    {
                        name: name,
                        email: email,
                        role: role
                    }   
                )}
            >
                <Row styleName="small">
                    <Icon name="user-profile" />
                    <Text>{name}</Text>
                    <Icon styleName="disclosure" name="right-arrow"/>
                </Row>
                <Divider styleName="line" />
            </TouchableOpacity>
        );
    }

    render() {
        if (this.state.loading) {
            return (
                <View
                    style={{alignItems: 'center',
                            flex: 1,
                            justifyContent: 'space-around'}}
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
                            justifyContent: 'space-around'}}
                >
                    <Text>Failed to load content!</Text>
                </View>
            );
        } else {
            return (
                <ScrollView>
                    <ListView 
                        data={this.state.list}
                        renderRow={this.renderItem} 
                    />
                    <PageButton />
                </ScrollView>
            );
        }
    }
}

const ListNav = StackNavigator({
    UserList: {
        screen: UserList,
        navigationOptions: {
            header: null
        }
    },
    Detail: {
        screen: UserDetail
    }
});

export default class List extends React.Component<ListProps, State> {
    static navigationOptions = {
        tabBarLabel: <Icon name="sidebar"/>
    }
    
    render() {
        return (
            <ListNav 
                screenProps={this.props.screenProps}
            />
        );
    }
}