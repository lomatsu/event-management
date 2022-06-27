import { EventModel } from "../database/model/Event"

export class EventViewModel {
  id: number
  name: string
  description: string
  date: string
  ticketsSold: number
  placeId: number
  companyId: number

  constructor(params: EventModel) {
    this.id = params.id
    this.name = params.name
    this.description = params.description
    this.date = params.date
    this.ticketsSold = params.tickets_sold
    this.placeId = params.place_id
    this.companyId = params.company_id
  }
}
