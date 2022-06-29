import { UserModel } from "../database/model/User"

export const usersMock: UserModel[] = [
	{
		id: 1,
		email: "miguel.teste@email.com.br",
		password: "1234@mudar",
		type: 'common'
	},
	{
		id: 2,
		email: "theo.teste@email.com.br",
		password: "1234@mudar",
		type: 'common'
	},
	{
		id: 3,
		email: "lauro.teste@teste.com.br",
		password: "1234@mudar",
		type: 'admin'
	}
]
