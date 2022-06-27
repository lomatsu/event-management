import { TicketViewModel } from "../../view-model/TicketViewModel"
import { ModelBase } from "./Base"

export class TicketModel extends ModelBase {
	event_id: number

	constructor(params: TicketViewModel) {
		super(params)
		this.event_id = params.eventId
	}
}
