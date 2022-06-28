import { Knex } from "knex";
import { tableName } from "../database/helps";
import { TicketModel } from "../database/model/Ticket";
import { IRepository } from "./Repository";

export interface ITicketRepository extends IRepository<TicketModel> {}

export class TicketRepository implements ITicketRepository {
	constructor(private db: Knex) { }
	getAll(): Promise<TicketModel[]> {
		throw new Error("Method not implemented.");
	}
	getById(id: number): Promise<TicketModel> {
		throw new Error("Method not implemented.");
	}
	update(data: Partial<TicketModel>): Promise<TicketModel> {
		throw new Error("Method not implemented.");
	}
	delete(id: number): Promise<boolean> {
		throw new Error("Method not implemented.");
	}
	create(data: TicketModel): Promise<TicketModel> {
		return this.db.insert(data, "*").into(tableName.TICKETS).then((d) => d[0])
	}
}
