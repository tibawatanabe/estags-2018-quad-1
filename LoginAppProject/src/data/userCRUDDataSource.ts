import User from '../model/user'
import {CRUDDataSource} from './CRUDDataSource'
import { Service } from 'typedi'
import { HttpRequestBuilder } from './httpRequestBuilder'

@Service()
export class UserCRUDDataSource implements CRUDDataSource {
  baseURL = 'https://tq-template-node.herokuapp.com/'
  httpRequestBuilder = new HttpRequestBuilder

  async create(token: string, email: string, password: string, name: string, role: string) {
    return this.httpRequestBuilder
      .method('post')
      .url(this.baseURL + 'user')
      .headers({
        Authorization: `${token}`,
        Accept: 'application/json'
      })
      .data({
        email: email,
        password: password,
        name: name,
        role: role
      })
      .execute()
  }
  async delete(token: string, id: number) {
    return this.httpRequestBuilder
      .method('delete')
      .url(this.baseURL + `user/${id}`)
      .headers({Authorization: `${token}`})
      .execute()
  }
  async getDetail(token: string, id: number) {
    return this.httpRequestBuilder
      .method('get')
      .url(this.baseURL + `user/${id}`)
      .headers({Authorization: `${token}`})
      .execute()
      .then((response) => {
        let user: User
        return user = response.data.data
      })
  }
  async edit(token: string, id: number, email: string, name: string) {
    return this.httpRequestBuilder
      .method('get')
      .url(this.baseURL + `user/${id}`)
      .headers({Authorization: `${token}`})
      .data({
        email: email,
        name: name
      })
      .execute()
  }
  async getList (token: string, page: number) {
    return this.httpRequestBuilder
      .url(this.baseURL + `users?pagination={"page": ${page} , "window": 10}`)
      .method('get')
      .headers({ Authorization: `${token}` })
      .execute()
  }
}