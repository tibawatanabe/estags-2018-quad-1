import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { ScrollView, TextInput, Button, TouchableOpacity, ListView, Icon, Row, Text, Divider, View } from '@shoutem/ui';
import axios from 'axios';

import UserDetail from '../artifacts/UserDetail';
import UserReg from '../artifacts/UserReg';

export interface UListProps {
    screenProps: any,
    navigation: any
}
export interface UListState {
    loading: boolean,
    list: any,
    error: boolean,
    pagination: any,
    page: number,
    search: string,
    searching: boolean
}
export interface ListProps {
    screenProps: any,
}
export interface PageProps {
    pagination: any,
    previousPage: () => void,
    nextPage: () => void,
    searching: boolean,
    stopSearch: () => void
}
export interface State {}

class PageButton extends React.Component<PageProps, State> {
    render() {
        const previousActive = (
            <Button 
                styleName="full-width"
                style={{backgroundColor: 'snow'}}
                onPress={() => this.props.previousPage()}
            >
                <Icon name="left-arrow"/>
                <Text>Previous</Text>
            </Button>
        );
        
        const previousInactive = (
            <Button 
                styleName="full-width muted"
                style={{backgroundColor: 'snow'}}
            >
                <Icon name="left-arrow"/>
                <Text>Previous</Text>
            </Button>
        );

        const nextActive = (
            <Button 
                styleName="full-width"
                style={{backgroundColor: 'snow'}}
                onPress={() => this.props.nextPage()}
            >
                <Text>Next</Text>
                <Icon name="right-arrow"/>                    
            </Button>
        );
        
        const nextInactive = (
            <Button 
                styleName="full-width muted"
                style={{backgroundColor: 'snow'}}
            >
                <Text>Next</Text>
                <Icon name="right-arrow"/>                    
            </Button>
        );
        if (this.props.searching === true) {
            return (
                <View styleName="horizontal flexible">
                    <Button 
                        styleName="full-width"
                        style={{backgroundColor: 'snow'}}
                        onPress={() => this.props.stopSearch()}
                    >
                        <Icon name="refresh"/>  
                        <Text>Show All</Text>                     
                    </Button>
                </View>
            );
        } else {
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
}

class UserList extends React.Component<UListProps, UListState> {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            list: [],
            error: false,
            pagination: {},
            page: 1,
            search: '',
            searching: false
        }
    }

    async getList() {
        let param = {
            page: (this.state.searching === true) ? 0 : this.state.page,
            window: (this.state.searching === true) ? this.state.pagination.total : 10
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
            if(this.state.searching === true) {
                let list = [];
                data.forEach((user) => {
                    if (user.name.includes(this.state.search) === true) {
                        list.push(user);
                    }
                })
                data = list;
            }
            let pagination = response.data.pagination;
            this.setState({loading: false, list: data, pagination: pagination, page: pagination.page})
        }
        catch (error) {
            console.log(error)
            this.setState({loading: false, error: true})
        }
    }

    refresh(page) {
        this.setState({page: page, loading: true})
    }

    showDetail(id) {
        this.props.navigation.navigate('Detail',
            {
                id: id,
                token: this.props.screenProps.state.params.data.token,
                page: this.state.page,
                refresh: (page) => this.refresh(page)
            }   
        )
    }

    onCreatePress() {
        this.props.navigation.navigate('Create',
            {
                token: this.props.screenProps.state.params.data.token,
                page: this.state.page,
                newPage: this.state.pagination.totalPages - 1,
                refresh: (page) => this.refresh(page)
            }
        )
    }

    renderItem = ({id, name}) => {
        return (
            <TouchableOpacity
                onPress={() => this.showDetail(id)}
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

    setSearch(search) {
        this.setState({search: search})
    }

    onSearchPress() {
        this.setState({searching: true, loading: true})
    }

    stopSearch() {
        this.setState({searching: false, loading: true, search: ''})
    }

    render() {
        if (this.state.loading) {
            this.getList();
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
        } else {
            return (
                <ScrollView
                    style={{
                        flex: 1,
                        backgroundColor: 'white'}}
                >
                    <View 
                        style={{
                            flexDirection: 'row',
                            flex: 1,
                            justifyContent: 'space-between'
                        }}
                    >
                        <TextInput
                            style={{ flex: 4 }}
                            styleName="full-width"
                            placeholder='Search'
                            onChangeText={(search) => this.setSearch(search)}
                        />
                        <Button
                            style={{ 
                                flex: 1,
                                backgroundColor: 'snow'
                            }}
                            onPress={() => this.onSearchPress()}
                        >
                            <Icon name="search" />
                        </Button>
                    </View>
                    <Divider styleName="line"/>
                    <ListView 
                        data={this.state.list}
                        renderRow={this.renderItem} 
                    />
                    <PageButton 
                        pagination={this.state.pagination}
                        previousPage={() => this.previousPage()}
                        nextPage={() => this.nextPage()}
                        searching={this.state.searching}
                        stopSearch={() => this.stopSearch()}
                    />
                    <Divider styleName="line"/>
                    <View styleName="horizontal flexible">
                        <Button 
                            styleName="full-width"
                            onPress={() => this.onCreatePress()}
                        >
                            <Icon name="add-friend" />
                            <Text>Add user</Text>
                        </Button>
                    </View>
                    <Divider styleName="line"/>
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
        screen: UserDetail,
        navigationOptions: {
            header: null
        }
    },
    Create: {
        screen: UserReg,
        navigationOptions: {
            header: null
        }
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