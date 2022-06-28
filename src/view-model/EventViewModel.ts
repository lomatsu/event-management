import { EventModel } from "../database/model/Event"
import { PlaceModel } from "../database/model/Place"

export class EventViewModel {
  id: number
  name: string
  description: string
  date: string
  ticketsSold: number
	placeCapacity?: number
  placeId: number
  companyId: number

  constructor(params: EventModel, places?: PlaceModel[]) {
    this.id = params.id
    this.name = params.name
    this.description = params.description
    this.date = params.date
    this.ticketsSold = params.tickets_sold
		this.placeCapacity = places?.find((x) => x.id === params.place_id)?.total_amount
    this.placeId = params.place_id
    this.companyId = params.company_id
  }
}
