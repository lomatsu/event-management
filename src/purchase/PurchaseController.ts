import { Application, Request, Response } from "express";
import { ControllerBase } from "../common/ControllerBase";
import { PurchaseModel } from "../database/model/Purchase";
import { IEventRepository, IPlaceRepository, IUserRepository } from "../repositories";
import { IPurchaseRepository } from "../repositories/PurchaseRepository";
import { PurchaseViewModel } from "../view-model/PurchaseViewModel";

export class PurchaseController extends ControllerBase<IPurchaseRepository> {
	public static readonly baseRouter: string = "/api/purchases"
	constructor(
		app: Application,
		repository: IPurchaseRepository,
		private placeRepository: IPlaceRepository,
		private eventRepository: IEventRepository,
	) {
		super(app, repository)
	}

	public async getAll(_: Request, res: Response): Promise<void> {
		try {
			const Purchases = await this.repository.getAll()
			const response = Purchases.map((Purchase) => new PurchaseViewModel(Purchase))

			res.json(response)
		} catch (error) {
			res.status(500).json({ message: "Error on get all purchases" })
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
			const Purchase = await this.repository.getById(id)
			if (!Purchase) {
				res.status(404).end()
				return
			}
			const response = new PurchaseViewModel(Purchase)

			res.json(response)
		} catch (error) {
			res.status(500).json({ message: "Error on get purchase by id" })
		}
	}

	public async save(req: Request, res: Response): Promise<void> {
		try {
			const body: PurchaseViewModel = req.body
			if (!body) {
				res.status(400).json({ message: "Body is required" })
			}
			const event = await this.eventRepository.getById(body.eventId)
			const eventCapacity = await (await this.placeRepository.getById(event.place_id)).total_amount as number
			if(event.tickets_sold > eventCapacity) {
				res.status(400).json({message: "Tickets sold out"})
				return
			}

			const data = new PurchaseModel(body)

			const Purchase = await this.repository.create(data)
			const response = new PurchaseViewModel(Purchase)

			res.json(response)
		} catch (error) {
			res.status(500).json({ message: "Error on save purchase" })
		}
	}
	public update(req: Request, res: Response): void {
		throw new Error("Method not implemented.");
	}
	public delete(req: Request, res: Response): void {
		throw new Error("Method not implemented.");
	}
	public async registerRoutes(): Promise<void> {
		this.app.get(PurchaseController.baseRouter, this.getAll.bind(this))
		this.app.post(PurchaseController.baseRouter, this.save.bind(this))
		this.app.get(`${PurchaseController.baseRouter}/:id`, this.getById.bind(this))
	}
}
