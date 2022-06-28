import { PurchaseModel } from "../database/model/Purchase"

export class PurchaseViewModel {
  id: number
  purchaseMadeIn: Date | string
  userId: number
  eventId: number

  constructor(params: PurchaseModel) {
    this.id = params.id
    this.purchaseMadeIn = params.purchase_made_in ? params.purchase_made_in : new Date()
    this.userId = params.user_id
    this.eventId = params.event_id
  }
}
