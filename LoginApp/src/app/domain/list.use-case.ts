import { UserDataSource } from '../data/user.datasource';
import { DataStorage } from '../data/user.datastorage';
import { Service } from 'typedi';

import { ListState } from '../interfaces/list.interfaces';

@Service()
export class ListUseCase {
  constructor(
    private dataSource: UserDataSource,
    private dataStorage: DataStorage,
  ) { }

  async getList(state: ListState) {
    let token = await this.dataStorage.load('token')
    let param = {
      page: (state.searching === true) ? 0 : state.page,
      window:(state.searching === true) ? state.pagination.total : 10
    }
    let data = this.dataSource.requestUserList(token, param);
    return data;
  }
}
