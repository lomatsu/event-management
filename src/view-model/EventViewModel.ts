import { EventModel } from "../database/model/Event"
import { PlaceModel } from "../database/model/Place"

export class EventViewModel {
	id: number
	name: string
	description: string
	date: string
	ticketsSold: number
	placeName?: string
	placeCapacity?: number
	placeId: number
	companyId: number
	companyName?: string

	constructor(params: EventModel & {
		companyName?: string,
		placeCapacity?: number
		placeName?: string
	}) {
		this.id = params.id
		this.name = params.name
		this.description = params.description
		this.date = params.date
		this.ticketsSold = params.tickets_sold
		this.placeName = params.placeName
		this.placeCapacity = params.placeCapacity
		this.placeId = params.place_id
		this.companyId = params.company_id
		this.companyName = params.companyName
	}
}
