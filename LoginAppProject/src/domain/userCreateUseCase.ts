import { UserCRUDDataSource } from '../data/userCRUDDataSource'
import { Container } from 'typedi'

export default class UserCreateUseCase {
  async createUser(token: string, email: string, password: string, name: string, role: string) {
    let userCreateDataSource = Container.get(UserCRUDDataSource)
    return userCreateDataSource.create(token, email, password, name, role)
  }
}