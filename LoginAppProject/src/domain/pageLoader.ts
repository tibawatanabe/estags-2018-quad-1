import { CRUDDataSource } from '../data/CRUDDataSource'
import { UserCRUDDataSource } from '../data/userCRUDDataSource'
import { ModelType } from '../model/modelType'
import { Service, Inject } from 'typedi'

class PageLoader {
  page: number
  totalPages: number
  data: any
  token: string

  constructor(private dataSource: CRUDDataSource) {
    this.page = 0
    this.totalPages = 100
  }

  async getPage<T>(page: number): Promise<T> {
    return this.dataSource.getList(this.token, page)
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

  setToken(token: string) {
    this.token = token
  }

  reset() {
    this.page = 0
  }

  async loadMore<T>(): Promise<T> {
    if (this.page < this.totalPages) {
      this.page = this.page + 1
      return this.getPage<T>(this.page)
    } else {
      return new Promise<T>((resolve) => resolve(this.data))
    }
  }
}

@Service()
export class PageLoaderFactory {

  userDataSource = new UserCRUDDataSource

  build(modelType: ModelType): PageLoader {
    switch (modelType) {
      case ModelType.User:
        return new PageLoader(this.userDataSource)
      default:
        return new PageLoader(this.userDataSource)
    }
  }
}