import { Application } from "express"
import { EventController } from "../event/EventController"
import { IEventRepository, IUserRepository } from "../repositories"

export const registerEventRoute = (
	app: Application,
	repository: IEventRepository,
	userRepository: IUserRepository
): void => {
	const controller = new EventController(
		app,
		repository,
		userRepository
	)
	controller.registerRoutes()
}
