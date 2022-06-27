import { CompanyModel } from "../database/model/Company"

export class CompanyViewModel {
  id: number
  name: string

  constructor(params: CompanyModel) {
    this.id = params.id
    this.name = params.name
  }
}
