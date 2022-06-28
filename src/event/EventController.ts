import { Application, Request, Response } from "express";
import { ControllerBase } from "../common/ControllerBase";
import { EventModel } from "../database/model/Event";
import { IEventRepository } from "../repositories/EventRepository";
import { EventViewModel } from "../view-model/EventViewModel";
import { auth } from '../common/middlewares/auth'
import { ICompanyRepository, IPlaceRepository, IUserRepository } from "../repositories";
import { CompanyViewModel } from "../view-model/CompanyViewModel";
import { PlaceViewModel } from "../view-model/PlaceViewModel";

export class EventController extends ControllerBase<IEventRepository> {
	public static readonly baseRouter: string = "/api/events"
	constructor(
		app: Application,
		repository: IEventRepository,
		private userRepository: IUserRepository,
		private placeRepository: IPlaceRepository,
		private companyRepository: ICompanyRepository
	) {
		super(app, repository)
	}

	public async getByName(req: Request, res: Response): Promise<void> {
		try {
			const name: string = req.params.name as string
			if (!name) {
				res.status(400).json({ message: "Event name is required" })
				return
			}
			const event = await this.repository.getByName(name)
			if (!event) {
				res.status(404).end()
				return
			}
			const response = new EventViewModel(event)
			response.companyName = await (await this.companyRepository.getById(response.companyId)).name
			const place = await (await this.placeRepository.getById(response.placeId))
			response.placeName = place.name
			response.placeCapacity = place.total_amount

			res.json(response)
		} catch (error) {
			res.status(500).json({ message: "Error on get event by name" })
		}
	}
	public async getAll(_: Request, res: Response): Promise<void> {
		try {
			const response: EventViewModel[] = []
			const events = await this.repository.getAll()
			const companies = await this.companyRepository.getAll()
			const places = await this.placeRepository.getAll()
			events.map((x) => new EventViewModel(x))
				.forEach((event) => {
					event.companyName = companies
						.map((x) => new CompanyViewModel(x))
						.find((x) => x.id === event.companyId)?.name

					const place = places
						.map((x) => new PlaceViewModel(x))
						.find((x) => x.id === event.placeId)

					event.placeName = place?.name
					event.placeCapacity = place?.totalAmount
					response.push(event)
				})

			res.json(response)

		} catch (error) {
			res.status(500).json({ message: "Error on get all events" })
		}
	}
	public async getById(req: Request, res: Response): Promise<void> {
		try {
			let id: string | number = req.params.id as string
			if (!id || +id < 1) {
				res.status(404).end()
				return
			}
			id = parseInt(id, 10)
			const event = await this.repository.getById(id)
			if (!event) {
				res.status(404).end()
				return
			}
			const response = new EventViewModel(event)
			response.companyName = await (await this.companyRepository.getById(response.companyId)).name
			const place = await (await this.placeRepository.getById(response.placeId))
			response.placeName = place.name
			response.placeCapacity = place.total_amount
			res.json(response)
		} catch (error) {
			res.status(500).json({ message: "Error on get event by id" })
		}
	}

	public async save(req: Request | any, res: Response): Promise<void> {
		try {
			const body: EventViewModel = req.body

			if (!body) {
				res.status(400).json({ message: "Body is required" })
			}
			body.ticketsSold = 0
			const data = new EventModel(body)
			const user = req.user
			if (!user) {
				res.status(401).json({ message: "Access denied" })
				return
			}
			const typeUser = await (await this.userRepository.getById(user.id)).type
			if (typeUser !== 'admin') {
				res.status(401).json({ message: "Access denied" })
				return
			}
			const event = await this.repository.create(data)
			const response = new EventViewModel(event)

			res.json(response)
		} catch (error) {
			res.status(500).json({ message: "Error on save event" })
		}
	}
	public update(req: Request, res: Response): void {
		throw new Error("Method not implemented.");
	}
	public delete(req: Request, res: Response): void {
		throw new Error("Method not implemented.");
	}
	public async registerRoutes(): Promise<void> {
		this.app.get(EventController.baseRouter, this.getAll.bind(this))
		this.app.post(EventController.baseRouter, auth, this.save.bind(this))
		this.app.get(`${EventController.baseRouter}/:id`, this.getById.bind(this))
		this.app.get(`${EventController.baseRouter}/by-name/:name`, this.getByName.bind(this))
	}
}
