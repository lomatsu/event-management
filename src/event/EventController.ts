import { Application, Request, Response } from "express";
import { ControllerBase } from "../common/ControllerBase";
import { EventModel } from "../database/model/Event";
import { ITicketRepository } from "../repositories";
import { IEventRepository } from "../repositories/EventRepository";
import { EventViewModel } from "../view-model/EventViewModel";

export class EventController extends ControllerBase<IEventRepository> {
	public static readonly baseRouter: string = "/api/events"
	constructor(app: Application, repository: IEventRepository, private ticketRepository: ITicketRepository) {
		super(app, repository)
	}
	public async getAll(_: Request, res: Response): Promise<void> {
		try {
			const events = await this.repository.getAll()
			const response = events.map((event) => new EventViewModel(event))

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
			const response = await this.repository.getById(id)

			res.json(response)
		} catch (error) {
			res.status(500).json({ message: "Error on get event by id" })
		}
	}
	public async save(req: Request, res: Response): Promise<void> {
		try {
			const { body } = req

			const data = new EventModel(body)
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
	public getByName(req: Request, res: Response): void {
		throw new Error("Method not implemented.");
	}
	public async registerRoutes(): Promise<void> {
		this.app.get(EventController.baseRouter, this.getAll.bind(this))
		this.app.post(EventController.baseRouter, this.save.bind(this))
		this.app.get(`${EventController.baseRouter}/:id`, this.getById.bind(this))
	}
}
