import authenticationDataSource from '../data/authenticationDataSource'

export default class LoginUseCase {
  async authentication(email: string, password: string, rememberMe: boolean) {
    let aut = new authenticationDataSource
    return aut.login(email, password, rememberMe)
  }
}