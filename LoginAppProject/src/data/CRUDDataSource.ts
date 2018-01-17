export interface CRUDDataSource {
  create(token: string, email: string, password: string, name: string, role: string): Promise<any>
  getDetail(token: string, id: number): Promise<any>
  edit(token: string, id: number, email: string, name: string): Promise<any>
  delete(token: string, id: number): Promise<any>
  getList(token: string, page: number)
}