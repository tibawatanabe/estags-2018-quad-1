import axios from 'axios'
import { Service } from 'typedi'
import User from '../model/user'

@Service()
export default class UserDetailDataSource {
  async getDetail(token: string, id: number) {
  return await axios.get(`https://tq-template-node.herokuapp.com/user/${id}`,
      {
        headers: {Authorization: `${token}`}
      }
    ).then((response) => {
      let user: User
      return user = response.data.data})
  }
}