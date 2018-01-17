import * as React from 'react';
import { Button, Icon, Text, View } from '@shoutem/ui';

interface PageProps {
  pagination: any,
  previousPage: () => void,
  nextPage: () => void,
  searching: boolean,
  stopSearch: () => void
}

export class PageButton extends React.Component<PageProps, any> {
  render() {
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
      let hasNext = (this.props.pagination.page === this.props.pagination.totalPages - 1) 
        ? false : true
      return (
        <View styleName="horizontal flexible">
          <Button 
            styleName={(this.props.pagination.page === 1) ? "full-width muted" : "full-width"}
            style={{backgroundColor: 'snow'}}
            onPress={(this.props.pagination.page === 1) ? null : () => this.props.previousPage()}
          >
            <Icon name="left-arrow"/>
            <Text>Previous</Text>
          </Button>
          <Button 
            styleName={(hasNext) ? "full-width" : "full-width muted"}
            style={{backgroundColor: 'snow'}}
            onPress={(hasNext) ? () => this.props.nextPage() : null}
          >
            <Text>Next</Text>
            <Icon name="right-arrow"/>                    
          </Button>
        </View>
      );
    }
  }
}
