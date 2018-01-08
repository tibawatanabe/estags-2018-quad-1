import * as React from 'react';
import { ScrollView, View, Text } from '@shoutem/ui';

interface Props {}
interface State {}

export default class UserDetail extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
             
        }
    }

    render() {
        return (
            <View>
                <Text>Detail</Text>
            </View>
        );
    }
}