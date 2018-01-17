import * as React from 'react';
import { ActivityIndicator } from 'react-native';

import { CenterView } from '../view/view.style';

export class Loading extends React.Component<any, any> {
  render() {
    return (
      <CenterView>
        <ActivityIndicator 
          animating={true}
        />
      </CenterView>
    );
  }
}
