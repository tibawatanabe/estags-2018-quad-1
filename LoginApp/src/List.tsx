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
    error: boolean,
    pagination: any,
    page: number
}
export interface ListProps {
    screenProps: any,
}
export interface PageProps {
    pagination: any,
    previousPage: () => void,
    nextPage: () => void
}
export interface State {}

class PageButton extends React.Component<PageProps, State> {
    render() {
        const previousActive = (
            <Button 
                styleName="full-width"
                onPress={() => this.props.previousPage()}
            >
                <Icon name="left-arrow"/>
                <Text>Previous</Text>
            </Button>
        );
        
        const previousInactive = (
            <Button styleName="full-width muted">
                <Icon name="left-arrow"/>
                <Text>Previous</Text>
            </Button>
        );

        const nextActive = (
            <Button 
                styleName="full-width"
                onPress={() => this.props.nextPage()}
            >
                <Text>Next</Text>
                <Icon name="right-arrow"/>                    
            </Button>
        );
        
        const nextInactive = (
            <Button styleName="full-width muted">
                <Text>Next</Text>
                <Icon name="right-arrow"/>                    
            </Button>
        );

        let hasNext = true;
        if (this.props.pagination.page === this.props.pagination.totalPages - 1) {
            hasNext = false;
        }

        if (this.props.pagination.page === 1) {
            return (
                <View styleName="horizontal flexible">
                    {previousInactive}
                    {hasNext ? nextActive : nextInactive}
                </View>
            );
        } else {
            return (
                <View styleName="horizontal flexible">
                    {previousActive}
                    {hasNext ? nextActive : nextInactive}
                </View>
            );
        }
    }
}

class UserList extends React.Component<UListProps, UListState> {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            list: [],
            error: false,
            pagination: {},
            page: 1
        }
    }
    async getList() {
        let param={
            page: this.state.page,
            window: 10
        };
        try {
            let response = await axios.get('http://tq-template-node.herokuapp.com/users',
                            {   
                                headers: {
                                    Authorization: this.props.screenProps.state.params.data.token
                                },
                                params: {
                                    pagination: param
                                }
                            })
            let data = response.data.data;
            let pagination= response.data.pagination;
            this.setState({loading: false, list: data, pagination: pagination, page: pagination.page})
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

    previousPage() {
        const page = this.state.pagination.page - 1;
        this.setState({page: page, loading: true})
    }

    nextPage() {
        const page = this.state.pagination.page + 1;
        this.setState({page: page, loading: true})
    }

    render() {
        console.log(this.state)
        if (this.state.loading) {
            this.getList();
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
                    <PageButton 
                        pagination={this.state.pagination}
                        previousPage={() => this.previousPage()}
                        nextPage={() => this.nextPage()}
                    />
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