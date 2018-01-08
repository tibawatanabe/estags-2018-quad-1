import * as React from 'react';
import { ScrollView, Text, Button } from '@shoutem/ui';

interface Props {}
interface State {}

export default class UserInfo extends React.Component<Props, State> {
    render() {
        return (
            <ScrollView>
                <Button
                    onPress={this.props.onLogoutPress}
                >
                    <Text>Log out</Text>
                </Button>
            </ScrollView>
        );
    }
}