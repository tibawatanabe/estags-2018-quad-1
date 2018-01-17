import { UserCRUDDataSource } from '../data/userCRUDDataSource'
import { Service, Container } from 'typedi'

@Service()
export default class UserEditUseCase {
  async editUser(token: string, id: number, email: string, name: string) {
    let userEditDataSource = Container.get(UserCRUDDataSource)
    return userEditDataSource.edit(token, id, email, name)
  }
}