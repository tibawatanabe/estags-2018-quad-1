import UserCreateDataSource from '../data/userCreateDataSource'
import { Container } from 'typedi'

export default class UserCreateUseCase {
  async createUser(token: string, email: string, password: string, name: string, role: string) {
    let userCreateDataSource = Container.get(UserCreateDataSource)
    return userCreateDataSource.createUser(token, email, password, name, role)
  }
}