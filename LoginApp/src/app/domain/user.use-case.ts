import { UserDataSource, DataStorage } from '../data';
import { Service } from 'typedi';

import { User, UserInfo, UserReg } from '../interfaces/user.interfaces';

@Service()
export class UserUseCase {
  constructor(
    private dataSource: UserDataSource,
    private dataStorage: DataStorage
  ) { }

  async update(user: User, state: UserInfo) {
    let token = await this.dataStorage.load('token');
    let edited = {
      name: (state.name !== '') ? state.name : user.name,
      email: (state.email !== '') ? state.email : user.email,
      role: (state.role !== '') ? state.role : user.role,
    }
    this.dataSource.updateUser(token, user.id, edited);
  }

  async get(id: number) {
    let token = await this.dataStorage.load('token');
    return this.dataSource.getUser(token, id);
  }

  async delete(id: number) {
    let token = await this.dataStorage.load('token');
    this.dataSource.deleteUser(token, id)
  }

  async create(user: UserReg) {
    let token = await this.dataStorage.load('token');
    let edited = {
      email: user.email,
      password: user.password,
      name: user.name,
      role: user.role
    }
    this.dataSource.createUser(token, edited);
  }
}
