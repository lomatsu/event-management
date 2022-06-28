import { PurchaseViewModel } from "../../view-model/PurchaseViewModel"
import { ModelBase } from "./Base"

export class PurchaseModel extends ModelBase {
	purchase_made_in: Date | string
  user_id: number
  event_id: number

	constructor(params: PurchaseViewModel) {
		super(params)
		this.purchase_made_in = params.purchaseMadeIn
		this.user_id = params.userId
		this.event_id = params.eventId
	}
}
