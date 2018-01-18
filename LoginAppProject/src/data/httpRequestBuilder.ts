import axios from 'axios'

// interface HttpRequest {
//   httpMethod: string
//   httpUrl: string
//   httpHeaders?: any
//   httpData?: any
// }

export class HttpRequestBuilder {
  request = {
    httpMethod: '',
    httpUrl: '',
    httpHeaders: {},
    httpData: undefined
  }
  method(method: string) {
    this.request.httpMethod = method
    return this
  }
  url(url: string) {
    this.request.httpUrl = url
    return this
  }
  headers(headers: any) {
    this.request.httpHeaders = Object.assign({}, this.request.httpHeaders, headers)
    return this
  }
  data(data: any) {
    this.request.httpData = data
    return this
  }
  async execute() {
    if (this.request.httpData === undefined) {
      return axios({
        method: this.request.httpMethod,
        url: this.request.httpUrl,
        headers: this.request.httpHeaders
      })
    } else {
      return axios({
        method: this.request.httpMethod,
        url: this.request.httpUrl,
        headers: this.request.httpHeaders,
        data: this.request.httpData
      })
    }
  }
}
