import { Knex } from "knex";
import { tableName } from "../database/helps";
import { CompanyModel } from "../database/model/Company";
import { IRepository } from "./Repository";

export interface ICompanyRepository extends IRepository<CompanyModel> {}

export class CompanyRepository implements ICompanyRepository {
	constructor(private db: Knex) { }
	getAll(): Promise<CompanyModel[]> {
		return this.db.select("*").from(tableName.COMPANIES)
	}
	getById(id: number): Promise<CompanyModel> {
		return this.db.select("*").from(tableName.COMPANIES).where({ id }).then((d) => d[0])
	}
	create(data: CompanyModel): Promise<CompanyModel> {
		return this.db.insert(data, "*").into(tableName.COMPANIES).then((d) => d[0])
	}
	async update(data: Partial<CompanyModel>): Promise<CompanyModel> {
		const model = await this.getById(data.id!)
		if (!model) {
			throw new Error("Company not found")
		}

		Object.keys(data).forEach((key: string) => {
			if ((data as any)[key]) {
				; (model as any)[key] = (data as any)[key]
			}
		})
		return this.db.update(data, "*").where({ id: data.id }).into(tableName.COMPANIES).then((d) => d[0])
	}
	async delete(id: number): Promise<boolean> {
		const model = await this.getById(id)
		if (!model) {
			throw new Error("Company not found")
		}
		return this.db.where(id).from(tableName.COMPANIES).del()
	}
}
