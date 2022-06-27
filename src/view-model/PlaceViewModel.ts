import { PlaceModel } from "../database/model/Place"

export class PlaceViewModel {
  id: number
  name: string
  totalAmount: number

  constructor(params: PlaceModel) {
    this.id = params.id
    this.name = params.name
    this.totalAmount = params.total_amount
  }
}
