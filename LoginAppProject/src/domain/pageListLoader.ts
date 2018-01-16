import UserListDataSource from '../data/userListDataSource'
import { Container } from 'typedi'

export default class PageListLoader {
  page: number
  totalPages: number
  data: any
  token: string
  constructor() {
    this.page = 0
    this.totalPages = 100
  }
  async getPage(page: number): Promise<any> {
    let userListDataSource = Container.get(UserListDataSource)
    let list = await userListDataSource.getUserList(this.token, page)
    .then((responseJson) => {
      this.data = (page === 0) ? responseJson.data.data : this.data.concat(responseJson.data.data)
      this.totalPages = responseJson.data.pagination.totalPages
      return this.data
      }
    )
    .catch((error) => {
      console.error(error)
    })
  }
  reset() {
    this.page = 0
  }

  setToken(token: string) {
    this.token = token
  }
  loadMore(): Promise<any> {
    if (this.page < this.totalPages) {
      this.page = this.page + 1
      return this.getPage(this.page)
    } else {
      return new Promise((resolve) => resolve(this.page))
    }
  }
}