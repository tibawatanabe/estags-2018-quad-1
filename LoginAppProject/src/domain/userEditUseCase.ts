import UserEditDataSource from '../data/userEditDataSource'
import { Service, Container } from 'typedi'

@Service()
export default class UserEditUseCase {
  async editUser(token: string, id: number, email: string, name: string) {
    let userEditDataSource = Container.get(UserEditDataSource)
    return userEditDataSource.editUser(token, id, email, name)
  }
}