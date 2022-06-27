import { PurchaseModel } from "../database/model/Purchase"

export class PurchaseViewModel {
  id: number
  purchaseMadeIn: Date | string
  userId: number
  ticketId: number

  constructor(params: PurchaseModel) {
    this.id = params.id
    this.purchaseMadeIn = params.purchase_made_in
    this.userId = params.user_id
    this.ticketId = params.ticket_id

  }
}
