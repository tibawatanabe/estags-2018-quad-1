import axios from 'axios'
import { Service } from 'typedi'

@Service()
export default class UserEditDataSource{
  async editUser(token: string, id: number, email: string, name: string) {
    return axios.put(`https://tq-template-node.herokuapp.com/user/${id}`,
      {
        email: email,
        name: name
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
