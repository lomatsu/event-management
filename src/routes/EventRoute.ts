import { Application } from "express"
import { EventController } from "../event/EventController"
import { IEventRepository, ITicketRepository } from "../repositories"

export const registerEventRoute = (
	app: Application,
	repository: IEventRepository,
	ticketRepository: ITicketRepository,
): void => {
	const controller = new EventController(
		app,
		repository,
		ticketRepository
	)
	controller.registerRoutes()
}
