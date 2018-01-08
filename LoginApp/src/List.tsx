import * as React from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { ListView, Tile, Title, Divider, View, Subtitle } from '@shoutem/ui';
import axios from 'axios';

import UserDetail from '../artifacts/UserDetail';

interface Props {}
interface State {
    loading: boolean,
    list: any
}

class UserList extends React.Component<Props, State> {
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
        axios.get('http://pokeapi.co/api/v2/pokemon-form/?limit=10')
                    .then(function (response) {
                        data = response.data.results;
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

    renderItem = ({url, name}) => {
        return (
            <View>
                <Tile styleName={'text-centric clear'}>
                    <Title styleName="md-gutter-bottom">{name}</Title>
                    <Subtitle styleName="sm-gutter-horizontal"></Subtitle>
                </Tile>
                <Divider styleName="line" />
            </View>
        );
    }

    render() {
        if (this.state.loading) {
            return (
                <View
                    style={{alignItems: 'center',
                    justifyContent: 'space-between'}}
                >
                    <Tile styleName={'text-centric inflexible'}>
                        <Title>
                            LoginApp
                        </Title>
                    </Tile>
                    <View>
                        <ActivityIndicator 
                            animating={true}
                        />
                    </View>
                </View>
            );
        }else {
            return (
                <ScrollView>
                    <Tile styleName={'text-centric inflexible'}>
                        <Title>
                            LoginApp
                        </Title>
                    </Tile>
                    <ListView 
                        data={this.state.list}
                        renderRow={this.renderItem} 
                    />
                </ScrollView>
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