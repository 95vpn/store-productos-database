const request = require("supertest")
const app = require("../app")

const BASE_URL = '/api/v1/users'

beforeAll(async () => {
    const user = {
        email: "yoneison@gmail.com",
        password: "yoneison1234",
    }

    const res = await request(app)
        post(`${BASE_URL}/login`)
        .send(user)

    console.log(res.body)
})