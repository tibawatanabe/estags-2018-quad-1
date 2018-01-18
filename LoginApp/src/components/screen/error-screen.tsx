import * as React from 'react';
import { Text } from '@shoutem/ui';

import { CenterView } from '../view';

export class Error extends React.Component<any, any> {
  render() {
    return (
      <CenterView>
        <Text>Failed to load content!</Text>
      </CenterView>
    );
  }
}
