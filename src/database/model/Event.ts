import { EventViewModel } from "../../view-model/EventViewModel"
import { ModelBase } from "./Base"

export class EventModel extends ModelBase {
	name: string
  description: string
  date: string
  tickets_sold: number
  place_id: number
  company_id: number

	constructor(params: EventViewModel) {
		super(params)
		this.name = params.name
		this.description = params.description
    this.date = params.date
    this.tickets_sold = params.ticketsSold
    this.place_id = params.placeId
    this.company_id = params.companyId
	}
}
