import { UserAuthentication } from '../data/authentication';
import { DataStorage } from '../data/user.datastorage';
import { Service } from 'typedi';

@Service()
export class LoginUseCase {
  constructor(
    private authentication: UserAuthentication,
    private dataStorage: DataStorage,
  ) { }

  async execute(email: string, passord: string, rememberMe: boolean = false) {
    let data = await this.authentication.requestAuth(email, passord, rememberMe);
    this.dataStorage.save('token', data.data.token);
    return data;
  }

  getEmail() {
    return this.dataStorage.load('email');
  }

  setEmail(email: string) {
    this.dataStorage.save('email', email);
  }

  deleteEmail() {
    this.dataStorage.delete('email');
  }

  async getRememberMe() {
    let rememberMe = await this.dataStorage.load('rememberMe');
    return (rememberMe === 'true') ? true : false
  }
  
  setRememberMe(rememberMe: boolean) {
    let value = (rememberMe) ? 'false' : 'true';
    this.dataStorage.save('rememberMe', value);
  }

  getToken() {
    return this.dataStorage.load('token');
  }
}
