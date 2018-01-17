import axios from 'axios';

const url = {
  LIST: 'http://tq-template-node.herokuapp.com/users',
  USER: 'http://tq-template-node.herokuapp.com/user/'
};

export class UserDataSource {
  async requestUserList (token: string, param: any) {
    let response = await axios.get(url.LIST,
      {   
        headers: {
          Authorization: token
        },
        params: {
          pagination: param
        }
      }
    )
    return response.data;
  }

  async updateUser (token: string, param: any, data: any) {
    await axios.put(url.USER+param,
      data,
      {   
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        },
      }
    )
  }

  async createUser (token: string, data: any) {
    await axios.post(url.USER,
      data,
      {   
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        },
      }
    )
  }

  async getUser (token: string, param: any) {
    let response = await axios.get(url.USER+param,
      {   
        headers: {
          Authorization: token
        }
      }
    )
    return response.data;
  }

  async deleteUser (token: string, param: any) {
    await axios.delete(url.USER+param,
      {   
        headers: {
          Authorization: token
        }
      }
    )
  }
}
