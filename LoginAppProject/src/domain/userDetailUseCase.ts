import UserDetailDataSource from '../data/userDetailDataSource'
import UserDeleteDataSource from '../data/userDeleteDataSource'
import { Service } from 'typedi'
import { Container } from 'typedi/Container'

@Service()
export default class UserDetailUseCase {
  async getDetail(token: string, id: number) {
    let userDetailDataSource = Container.get(UserDetailDataSource)
    return userDetailDataSource.getDetail(token, id)
  }
  async delete(token: string, id: number) {
    let userDeleteDataSource = Container.get(UserDeleteDataSource)
    return userDeleteDataSource.delete(token, id)
  }
}