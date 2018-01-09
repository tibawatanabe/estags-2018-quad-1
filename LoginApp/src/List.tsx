import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Screen, TouchableOpacity, ListView, Icon, Row, Text, Divider, View } from '@shoutem/ui';
import axios from 'axios';

import UserDetail from '../artifacts/UserDetail';

interface Props {}
interface State {
    loading: boolean,
    list: any
}

class UserList extends React.Component<Props, State> {
    static navigationOptions = {
        tabBarLabel: <Icon name="sidebar"/>
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            list: []
        }
    }
    componentWillMount = async () => {
        let success = false
        let data = [];
        let pagination={
            page: 0,
            window: 10
        };
        axios.get('http://tq-template-node.herokuapp.com/users',
                    {   headers: {
                            Authorization: this.props.screenProps.token
                        },
                        params: {
                            pagination: pagination
                        }
                    })
                    .then(function (response) {
                        data = response.data.data;
                        pagination= response.data.pagination;
                        success = true;
                    })
                    .catch(function (error) {
                        this.setState({loading: false, error: true})
                    })
                    .then(() => {
                        if (success) {
                            this.setState({loading: false, list: data})
                        }
                    });
    }

    renderItem = ({name}) => {
        return (
            <TouchableOpacity
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
        }else {
            return (
                <Screen>
                    <ListView 
                        data={this.state.list}
                        renderRow={this.renderItem} 
                    />
                </Screen>
            );
        }
    }
}

export default List = StackNavigator({
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