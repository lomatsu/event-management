import { Application } from "express"
import { EventController } from "../event/EventController"
import { ICompanyRepository, IEventRepository, IPlaceRepository, IUserRepository } from "../repositories"

export const registerEventRoute = (
	app: Application,
	repository: IEventRepository,
	userRepository: IUserRepository,
	placeRepository: IPlaceRepository,
	companyRepository: ICompanyRepository
): void => {
	const controller = new EventController(
		app,
		repository,
		userRepository,
		placeRepository,
		companyRepository
	)
	controller.registerRoutes()
}
