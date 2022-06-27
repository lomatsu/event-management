import { CompanyViewModel } from "../../view-model/CompanyViewModel"
import { ModelBase } from "./Base"

export class CompanyModel extends ModelBase {
	name: string

	constructor(params: CompanyViewModel) {
		super(params)
		this.name = params.name
	}
}
