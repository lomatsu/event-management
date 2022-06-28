import { Knex } from "knex";
import { tableName } from "../database/helps";
import { EventModel } from "../database/model/Event";
import { IRepository } from "./Repository";

export interface IEventRepository extends IRepository<EventModel> {}

export class EventRepository implements IEventRepository {
	constructor(private db: Knex) { }
	getAll(): Promise<EventModel[]> {
		return this.db.select("*").from(tableName.EVENTS)
	}
	getById(id: number): Promise<EventModel> {
		return this.db.select("*").from(tableName.EVENTS).where({ id }).then((d) => d[0])
	}
	create(data: EventModel): Promise<EventModel> {
		return this.db.insert(data, "*").into(tableName.EVENTS).then((d) => d[0])
	}
	async update(data: Partial<EventModel>): Promise<EventModel> {
		const model = await this.getById(data.id!)
		if (!model) {
			throw new Error("Event not found")
		}

		Object.keys(data).forEach((key: string) => {
			if ((data as any)[key]) {
				; (model as any)[key] = (data as any)[key]
			}
		})
		return this.db.update(data, "*").where({ id: data.id }).into(tableName.EVENTS).then((d) => d[0])
	}
	async delete(id: number): Promise<boolean> {
		const model = await this.getById(id)
		if (!model) {
			throw new Error("Event not found")
		}
		return this.db.where(id).from(tableName.EVENTS).del()
	}
}
