import { UserViewModel } from "../../view-model/UserViewModel"
import { ModelBase } from "./Base"

export class UserModel extends ModelBase {
	email: string
	password: string
	type: string

	constructor(params: UserViewModel) {
		super(params)
		this.email = params.email
		this.password = params.password
		this.type = params.type
	}
}
