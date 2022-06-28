import { Knex } from "knex";
import { tableName } from "../database/helps";
import { PlaceModel } from "../database/model/Place";
import { IRepository } from "./Repository";

export interface IPlaceRepository extends IRepository<PlaceModel> {}

export class PlaceRepository implements IPlaceRepository {
	constructor(private db: Knex) { }
	getAll(): Promise<PlaceModel[]> {
		return this.db.select("*").from(tableName.PLACES)
	}
	getById(id: number): Promise<PlaceModel> {
		return this.db.select("*").from(tableName.PLACES).where({ id }).then((d) => d[0])
	}
	create(data: PlaceModel): Promise<PlaceModel> {
		return this.db.insert(data, "*").into(tableName.PLACES).then((d) => d[0])
	}
	async update(data: Partial<PlaceModel>): Promise<PlaceModel> {
		const model = await this.getById(data.id!)
		if (!model) {
			throw new Error("Place not found")
		}

		Object.keys(data).forEach((key: string) => {
			if ((data as any)[key]) {
				; (model as any)[key] = (data as any)[key]
			}
		})
		return this.db.update(data, "*").where({ id: data.id }).into(tableName.PLACES).then((d) => d[0])
	}
	async delete(id: number): Promise<boolean> {
		const model = await this.getById(id)
		if (!model) {
			throw new Error("Place not found")
		}
		return this.db.where(id).from(tableName.PLACES).del()
	}
}
