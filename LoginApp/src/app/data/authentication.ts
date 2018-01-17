import axios from 'axios';

const url = {
  LOGIN: 'http://tq-template-node.herokuapp.com/authenticate',
};

export class UserAuthentication  {
  async requestAuth (email: string, password: string, rememberMe: boolean) {
      let response = await axios.post(url.LOGIN,
        {
          email: email,
          password: password,
          rememberMe: rememberMe
        },
        { 
          headers: 
            {'Content-Type': 'application/json' }
        })
      return response.data;
  }
}
