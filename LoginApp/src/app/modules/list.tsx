import * as React from 'react';
import { TouchableOpacity, Icon, Row, Text, Divider } from '@shoutem/ui';
import { Container } from 'typedi';

import { ListUseCase } from '../domain/list.use-case';
import { ListState } from '../interfaces/list.interfaces';
import { Loading } from '../../components/screen/loading-screen';
import { Error } from '../../components/screen/error-screen';
import { List } from '../../components/screen/list-screen';

export class UserList extends React.Component<any, ListState> {
  static navigationOptions = {
    tabBarLabel: <Icon name="sidebar"/>
  }

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
    try {
      let response = await Container.get(ListUseCase).getList(this.state);
      let data = response.data;
      data = this.filter(data);
      let pagination = response.pagination;
      this.setState({loading: false, list: data, pagination: pagination, page: pagination.page})
    }
    catch (error) {
      console.log(error)
      this.setState({loading: false, error: true})
    }
  }

  filter(data) {
    if(this.state.searching === true) {
      let list = [];
      data.forEach((user) => {
        if (user.name.includes(this.state.search)) {
          list.push(user);  
        }
      })
      return list;
    } else {
        return data;
    }
  }

  refresh(page) {
    this.setState({page: page, loading: true})
  }

  showDetail(id) {
    this.props.navigation.navigate('Detail',
      {
        id: id,
        page: this.state.page,
        refresh: (page) => this.refresh(page)
      }   
    )
  }

  onCreatePress() {
    this.props.navigation.navigate('Create',
      {
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
      return <Loading />
    } else if (this.state.error) {
      return <Error />
    } else {
      return (
        <List 
          list={this.state.list}
          pagination={this.state.pagination}
          searching={this.state.searching}
          setSearch={(search) => this.setSearch(search)}
          onSearchPress={() => this.onSearchPress()}
          renderItem={this.renderItem}
          previousPage={() => this.previousPage()}
          nextPage={() => this.nextPage()}
          stopSearch={() => this.stopSearch()}
          onCreatePress={() => this.onCreatePress()}
        />
      );
    }
  }
}
