import { Application } from "express"
import { EventController } from "../event/EventController"
import { IEventRepository } from "../repositories"

export const registerEventRoute = (
	app: Application,
	repository: IEventRepository,
): void => {
	const controller = new EventController(
		app,
		repository,
	)
	controller.registerRoutes()
}
