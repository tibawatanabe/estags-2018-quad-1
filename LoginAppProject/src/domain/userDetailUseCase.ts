import { UserCRUDDataSource } from '../data/userCRUDDataSource'
import { Service } from 'typedi'
import { Container } from 'typedi/Container'

@Service()
export default class UserDetailUseCase {
  async getDetail(token: string, id: number) {
    let userDetailDataSource = Container.get(UserCRUDDataSource)
    return userDetailDataSource.getDetail(token, id)
  }
  async delete(token: string, id: number) {
    let userDeleteDataSource = Container.get(UserCRUDDataSource)
    return userDeleteDataSource.delete(token, id)
  }
}