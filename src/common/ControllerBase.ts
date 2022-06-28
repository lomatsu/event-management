import { Application, Request, Response } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { ParsedQs } from "qs"

export interface IControllerBase {
	getAll(req: Request, res: Response): void
  getById(req: Request, res: Response): void
	save(req: Request, res: Response): void
	update(req: Request, res: Response): void
	delete(req: Request, res: Response): void
	registerRoutes(): void
}

export abstract class ControllerBase<R> implements IControllerBase {
	constructor(protected app: Application, protected repository: R) {}
	public abstract getAll(req: Request, res: Response): void
  public abstract getById(req: Request, res: Response): void
	public abstract save(req: Request, res: Response): void
	public abstract update(req: Request, res: Response): void
	public abstract delete(req: Request, res: Response): void
	public abstract registerRoutes(): void
}
