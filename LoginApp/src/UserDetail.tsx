import * as React from 'react';
import { ScrollView, Tile, Icon, Divider, Caption, Text } from '@shoutem/ui';

export interface DetailProps {
    navigation: any
}
export interface DetailState {}

export default class UserDetail extends React.Component<DetailProps, DetailState> {
    static navigationOptions = ({ navigation }) => ({
        tabBarLabel: <Icon name="sidebar"/>,
        title: `${navigation.state.params.name}`
    });

    render() {
        return (
            <ScrollView 
                style={{
                    flex: 1,
                    backgroundColor: 'white'
                }}
            >
                <Tile styleName={'text-centric inflexible'}>
                        <Icon name="user-profile"/>
                </Tile>
                <Divider styleName={'section-header'}>
                    <Caption>E-mail</Caption>
                    <Text>{this.props.navigation.state.params.email}</Text>
                </Divider>
                <Divider styleName={'section-header'}>
                    <Caption>Role</Caption>
                    <Text>{this.props.navigation.state.params.role}</Text>
                </Divider>
            </ScrollView>
        );
    }
}