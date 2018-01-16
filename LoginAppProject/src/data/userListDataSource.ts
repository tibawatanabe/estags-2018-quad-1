import axios from 'axios'
import { Service } from 'typedi'

@Service()
export default class UserListDataSource {
  async getUserList (token: string, page: number) {
    return axios.get(`https://tq-template-node.herokuapp.com/users?pagination={"page": ${page} , "window": 10}`,
      {
        headers: {
          Authorization: `${token}`
        }
      }
    )
  }
}