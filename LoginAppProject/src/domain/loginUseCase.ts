import authenticationDataSource from '../data/authenticationDataSource'
import { Service } from 'typedi'
import { Container } from 'typedi/Container'

@Service()
export default class LoginUseCase {
  async authentication(email: string, password: string, rememberMe: boolean) {
    let aut = Container.get(authenticationDataSource)
    return aut.login(email, password, rememberMe)
  }
}