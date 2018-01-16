import axios from 'axios'

export default class Authentication {
  constructor() {
    // ...
  }
  async login (email: string, password: string, rememberMe: boolean) {
    return await axios.post('https://tq-template-node.herokuapp.com/authenticate',
      {
        email: email,
        password: password,
        rememberMe: rememberMe
      },
      {
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        }
      }
    )
  }
}