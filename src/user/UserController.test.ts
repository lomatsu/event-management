import { Response } from "express"
import {
	createExpressRequestMock,
	createExpressResponseMock,
} from "../common/utils/tests"
import { UserController } from "./UserController"
import { MockResponse } from "node-mocks-http"
import application from "../bin/www-test"
import knex from "../database/connection"
import mockDB from "mock-knex"
import { UserRepository } from "../repositories"
import { UserModel } from "../database/model/User"
import { usersMock } from "./mock-data"
import { UserViewModel } from "../view-model/UserViewModel"

describe("UserController", () => {
	let controller: UserController
	let tracker: mockDB.Tracker
	application.set("userLoggedId", 1)
	let response: MockResponse<Response<any, Record<string, any>>>
	const app = {
		get: jest.fn(),
		post: jest.fn(),
		put: jest.fn(),
		delete: jest.fn(),
	}
	beforeAll(() => mockDB.mock(knex))
	afterAll(() => mockDB.unmock(knex))
	beforeEach(() => {
		tracker = mockDB.getTracker()
		tracker.install()
		response = createExpressResponseMock()
		controller = new UserController(application, new UserRepository(knex))
	})
	afterEach(() => tracker.uninstall())

	it("should register routes", () => {
		controller = new UserController(app as any, new UserRepository(knex))
		controller.registerRoutes()
		expect(app.get).toBeCalledTimes(2)
		expect(app.post).toBeCalledTimes(2)
	})

	it("should return 200 on getByEmail ", (done) => {
		tracker.on("query", (query) => {
			query.response([usersMock, usersMock.filter((x) => x.email === "user@gmail.com")])
		})
		const request = createExpressRequestMock({
			params: { email: "user@gmail.com" },
		})
		controller
			.getByEmail(request, response)
			.then(() => {
				expect(response._getStatusCode()).toBe(200)
				done()
			})
			.catch((err) => done(err))
	})

	it("should return 404 on getByEmail | no email ", (done) => {
		tracker.on("query", (query) => {
			query.response([])
		})
		const request = createExpressRequestMock({ params: { password: "minhasnh" } })
		controller
			.getByEmail(request, response)
			.then(() => {
				expect(response._getStatusCode()).toBe(400)
				done()
			})
			.catch((err) => done(err))
	})

	it("should return 404 on getByEmail when users does not exists ", (done) => {
		tracker.on("query", (query) => {
			query.response([])
		})
		const request = createExpressRequestMock({ params: { email: "tesdasdfasdf@gmail.com" } })
		controller
			.getByEmail(request, response)
			.then(() => {
				expect(response._getStatusCode()).toBe(404)
				done()
			})
			.catch((err) => done(err))
	})
	it("should return error on to try get user by email", (done) => {
		const request = createExpressRequestMock({ params: { email: "user@gmail.com" } })
		controller = new UserController(application, {
			getByEmail(email: string) {
				return Promise.reject(email)
			},
		} as UserRepository)
		controller
			.getByEmail(request, response)
			.then(() => {
				expect(response._getStatusCode()).toBe(500)
				done()
			})
			.catch((err) => done(err))
	})

	//
	it("should return 400 on login | no wmail", (done) => {
		const payload = {
			password: "minhasenha"
		} as UserViewModel
		tracker.on("query", (query) => {
			query.response([payload])
		})
		const request = createExpressRequestMock({
			body: payload,
		})
		controller
			.login(request, response)
			.then(() => {
				expect(response._getStatusCode()).toBe(400)
				done()
			})
			.catch((err) => done(err))
	})


	it("should return 400 on login | no password", (done) => {
		const payload = {
			email: "user@gmail.com",
		} as UserViewModel
		tracker.on("query", (query) => {
			query.response([payload])
		})
		const request = createExpressRequestMock({
			body: payload,
		})
		controller
			.login(request, response)
			.then(() => {
				expect(response._getStatusCode()).toBe(400)
				done()
			})
			.catch((err) => done(err))
	})

	it("should return all users", (done) => {
		tracker.on("query", (query) => {
			query.response(usersMock)
		})
		const request = createExpressRequestMock()
		controller
			.getAll(request, response)
			.then(() => {
				expect(response._getStatusCode()).toBe(200)
				const data = response._getJSONData()
				expect(data).toBeDefined()
				expect(data.length).toBe(usersMock.length)
				done()
			})
			.catch((err) => done(err))
	})

	it("should return error on to try get all users", (done) => {
		const request = createExpressRequestMock({ params: { id: 1 } })
		controller = new UserController(application, {
			getAll() {
				return Promise.reject()
			},
		} as UserRepository)
		controller
			.getAll(request, response)
			.then(() => {
				expect(response._getStatusCode()).toBe(500)
				const data: { message: string } = response._getJSONData()
				expect(data).toBeDefined()
				expect(data.message).toBe("Error on get all users")
				done()
			})
			.catch((err) => done(err))
	})

	it("should return 200 on getById ", (done) => {
		tracker.on("query", (query) => {
			query.response([usersMock, usersMock.filter((x) => x.id === 1)])
		})
		const request = createExpressRequestMock({
			params: { id: 1 },
		})
		controller
			.getById(request, response)
			.then(() => {
				expect(response._getStatusCode()).toBe(200)
				done()
			})
			.catch((err) => done(err))
	})
	it("should return 404 on getById when the id is -1 ", (done) => {
		const request = createExpressRequestMock({ params: { id: -1 } })
		controller
			.getById(request, response)
			.then(() => {
				expect(response._getStatusCode()).toBe(404)
				done()
			})
			.catch((err) => done(err))
	})
	it("should return 404 on getById when the id is nan ", (done) => {
		tracker.on("query", (query) => {
			query.response([])
		})
		const request = createExpressRequestMock({ params: { id: "nan" } })
		controller
			.getById(request, response)
			.then(() => {
				expect(response._getStatusCode()).toBe(404)
				done()
			})
			.catch((err) => done(err))
	})

	it("should return 404 on getById when users does not exists ", (done) => {
		tracker.on("query", (query) => {
			query.response([])
		})
		const request = createExpressRequestMock({ params: { id: 99 } })
		controller
			.getById(request, response)
			.then(() => {
				expect(response._getStatusCode()).toBe(404)
				done()
			})
			.catch((err) => done(err))
	})
	it("should return error on to try get user by id", (done) => {
		const request = createExpressRequestMock({ params: { id: 1 } })
		controller = new UserController(application, {
			getById(id: number) {
				return Promise.reject(id)
			},
		} as UserRepository)
		controller
			.getById(request, response)
			.then(() => {
				expect(response._getStatusCode()).toBe(500)
				done()
			})
			.catch((err) => done(err))
	})

	it("should create a new user", (done) => {
		const payload = {
			id: 99,
			email: "Test User",
			password: "123@mudar"
		} as UserViewModel
		tracker.on("query", (query) => {
			query.response([payload])
		})
		const request = createExpressRequestMock({
			body: payload,
		})
		controller
			.save(request, response)
			.then(() => {
				expect(response._getStatusCode()).toBe(200)
				done()
			})
			.catch((err) => done(err))
	})
	it("should return error on to try create a new user", (done) => {
		const request = createExpressRequestMock()
		controller = new UserController(application, {
			create(data: UserModel) {
				return Promise.reject(data)
			},
		} as UserRepository)
		controller
			.save(request, response)
			.then(() => {
				const data: { message: string } = response._getJSONData()
				expect(response._getStatusCode()).toBe(500)
				expect(data).toBeDefined()
				expect(data.message).toBe("Error on save user")
				done()
			})
			.catch((err) => done(err))
	})
})
