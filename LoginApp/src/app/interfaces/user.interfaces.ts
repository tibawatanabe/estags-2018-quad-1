export interface UserInfoState {
  editing: boolean,
  error: boolean,
  edited: boolean,
  name: string,
  email: string,
  role: string
}

export interface UserRegState {
  error: boolean,
  name: string,
  email: string,
  password: string,
  role: string
}

export interface UserReg {
  email: string,
  password: string,
  name: string,
  role: string
}

export interface UserInfo {
  name: string,
  email: string,
  role: string
}

export interface User {
  activationToken: boolean,
  active: boolean,
  createdAt: boolean,
  email: string,
  id: number,
  name: string,
  role: string,
  updatedAt: string
}
