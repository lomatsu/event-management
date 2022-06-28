import { Application, Request, Response } from "express";
import { ControllerBase } from "../common/ControllerBase";
import { UserModel } from "../database/model/User";
import { IUserRepository } from "../repositories/UserRepository";
import { UserViewModel } from "../view-model/UserViewModel";

export class UserController extends ControllerBase<IUserRepository> {
	public static readonly baseRouter: string = "api/uers"
	constructor(app: Application, repository: IUserRepository) {
		super(app, repository)
	}
	public async getAll(_: Request, res: Response): Promise<void> {
		try {
			const users = await this.repository.getAll()
			const response = users.map((user) => new UserViewModel(user))

			res.json(response)
		} catch (error) {
			res.status(500).json({ message: "Error on get all users" })
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
			const user = await this.repository.getById(id)
			if (!user) {
				res.status(404).end()
				return
			}
			const response = await this.repository.getById(id)

			res.json(response)
		} catch (error) {
			res.status(500).json({ message: "Error on get user by id" })
		}
	}
	public async save(req: Request, res: Response): Promise<void> {
		try {
			const { body } = req
			const data = new UserModel(body)
			const user = await this.repository.create(data)
			const response = new UserViewModel(user)

			res.json(response)
		} catch (error) {
			res.status(500).json({ message: "Error on save user" })
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
		this.app.get(UserController.baseRouter, this.getAll.bind(this))
		this.app.get(UserController.baseRouter, this.save.bind(this))
		this.app.get(`${UserController.baseRouter}/:id`, this.getById.bind(this))
	}
}
