import axios from 'axios'
import { Service } from 'typedi'

@Service()
export default class UserDeleteDataSource {
  async delete(token: string, id: number) {
  return await axios.delete(`https://tq-template-node.herokuapp.com/user/${id}`,
      {
        headers: {Authorization: `${token}`}
      }
    )
  }
}