import { UserModel } from "../database/model/User"

export class UserViewModel {
  id: number
  email: string
  password: string
  type: string

  constructor(params: UserModel) {
    this.id = params.id
    this.email = params.email
    this.password = params.password
    this.type = params.type
  }
}
