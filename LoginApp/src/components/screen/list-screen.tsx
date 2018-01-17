import * as React from 'react';
import { Button, Icon, ListView, Divider, TextInput, Text, View } from '@shoutem/ui';

import { DefaultScroll } from '../view/scroll.style';
import { RowView } from '../view/view.style';
import { PageButton } from '../button/page-button';

interface ListProps {
  list: any,
  pagination: any,
  searching: any,
  setSearch: (search) => void,
  onSearchPress: () => void,
  renderItem: any
  previousPage: () => void,
  nextPage: () => void,
  stopSearch: () => void,
  onCreatePress: () => void
}

export class List extends React.Component<ListProps, any> {
  render() {
    return (
      <DefaultScroll>
        <RowView>
          <TextInput
            style={{ flex: 4 }}
            styleName="full-width"
            placeholder='Search'
            onChangeText={(search) => this.props.setSearch(search)}
          />
          <Button
            style={{ 
              flex: 1,
              backgroundColor: 'snow'
            }}
            onPress={() => this.props.onSearchPress()}
          >
            <Icon name="search" />
          </Button>
        </RowView>
        <Divider styleName="line"/>
        <ListView 
          data={this.props.list}
          renderRow={this.props.renderItem} 
        />
        <PageButton 
          pagination={this.props.pagination}
          previousPage={() => this.props.previousPage()}
          nextPage={() => this.props.nextPage()}
          searching={this.props.searching}
          stopSearch={() => this.props.stopSearch()}
        />
        <Divider styleName="line"/>
        <View styleName="horizontal flexible">
          <Button 
            styleName="full-width"
            onPress={() => this.props.onCreatePress()}
          >
            <Icon name="add-friend" />
            <Text>Add user</Text>
          </Button>
        </View>
        <Divider styleName="line"/>
      </DefaultScroll>
    );
  }
}
