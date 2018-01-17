import axios from 'axios'
import User from '../model/user'
import {CRUDDataSource} from './CRUDDataSource'
import { Service } from 'typedi'

@Service()
export class UserCRUDDataSource implements CRUDDataSource {
  async create(token: string, email: string, password: string, name: string, role: string) {
    return axios.post('https://tq-template-node.herokuapp.com/user',
      {
        email: email,
        password: password,
        name: name,
        role: role
      },
      {
        headers:
        {
          Authorization: `${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
  }
  async delete(token: string, id: number) {
    return await axios.delete(`https://tq-template-node.herokuapp.com/user/${id}`,
      {
        headers: {Authorization: `${token}`}
      }
    )
  }
  async getDetail(token: string, id: number) {
    return await axios.get(`https://tq-template-node.herokuapp.com/user/${id}`,
      {
        headers: {Authorization: `${token}`}
      }
    ).then((response) => {
      let user: User
      return user = response.data.data
    })
  }
  async edit(token: string, id: number, email: string, name: string) {
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
  async getList (token: string, page: number) {
    return axios.get(`https://tq-template-node.herokuapp.com/users?pagination={"page": ${page} , "window": 10}`,
      {
        headers: {
          Authorization: `${token}`
        }
      }
    )
  }
}