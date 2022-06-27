import { TicketModel } from "../database/model/Ticket"

export class TicketViewModel {
  id: number
  eventId: number

  constructor(params: TicketModel) {
    this.id = params.id
    this.eventId = params.event_id
  }
}
