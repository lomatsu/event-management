import { Knex } from "knex";
import { tableName } from "../database/helps";
import { PurchaseModel } from "../database/model/Purchase";
import { IRepository } from "./Repository";

export interface IPurchaseRepository extends IRepository<PurchaseModel> { }

export class PurchaseRepository implements IPurchaseRepository {
	constructor(private db: Knex) { }
	getAll(): Promise<PurchaseModel[]> {
		return this.db.select("*").from(tableName.PURCHASES)
	}
	getById(id: number): Promise<PurchaseModel> {
		return this.db.select("*").from(tableName.PURCHASES).where({ id }).then((d) => d[0])
	}
	update(data: Partial<PurchaseModel>): Promise<PurchaseModel> {
		throw new Error("Method not implemented.");
	}
	delete(id: number): Promise<boolean> {
		throw new Error("Method not implemented.");
	}
	create(data: PurchaseModel): Promise<PurchaseModel> {
		return this.db.insert(data, "*").into(tableName.PURCHASES).then((d) => d[0])
	}
}
