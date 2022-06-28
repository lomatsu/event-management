import { Application } from "express"
import { PurchaseController } from "../purchase/PurchaseController"
import { IPurchaseRepository, IPlaceRepository, IEventRepository } from "../repositories"

export const registerPurchaseRoute = (
	app: Application,
	repository: IPurchaseRepository,
	placeRepository: IPlaceRepository,
	eventRepository: IEventRepository
): void => {
	const controller = new PurchaseController(
		app,
		repository,
		placeRepository,
		eventRepository
	)
	controller.registerRoutes()
}
