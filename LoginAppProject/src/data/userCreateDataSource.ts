import axios from 'axios'
import { Service } from 'typedi'

@Service()
export default class UserCreateDataSource {
  async createUser(token: string, email: string, password: string, name: string, role: string) {
    return axios.post('https://tq-template-node.herokuapp.com/user',
      {
        email: email,
        password: password,
        name: name,
        role: role
      },
      {
        headers: {
          Authorization: `${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
  }
}