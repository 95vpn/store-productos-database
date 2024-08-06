require("../models")

const request = require("supertest")
const app = require('../app')
const Product = require("../models/Product")

const URL_BASE = "/api/v1/purchase"

let TOKEN
let userId
let productBody
let product


beforeAll(async () => {
    //inicio de sesion
    const user = {
        email: "yoneison@gmail.com",
        password: "yoneison1234",
    }

    const res = await request(app)
        .post('/api/v1/users/login')
        .send(user)

    TOKEN = res.body.token
    userId = res.body.user.id

    //PRODUCT
    productBody = {
        nombre_product: "productTest",
        description: "lorem20",
        price: 18,
        stock: 50
    }

    product = await Product.create(productBody)

    //CART
    bodyCart = {
        quantity: 1,
        productId: product.id,
    }

    await request(app)
        .post('/api/v1/cart')
        .send(bodyCart)
        .set("Authorization", `Bearer ${TOKEN}`)

});

test("POST -> 'URL_BASE', SHOULD return statusCode 201 and res.body.quantity === bodyCart.quantity", async () => {
    const res = await request(app)
        .post(URL_BASE)
        .set("Authorization", `Bearer ${TOKEN}`)

        expect(res.statusCode).toBe(201)
        expect(res.body[0].quantity).toBe(bodyCart.quantity)
});

test("GETALL -> 'URL_BASE', SHOULD RETURN STATUScODE 200 res.body.length === 1", async () => {
    const res = await request(app)
        .get(URL_BASE)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    expect(res.body[0].userId).toBeDefined()
    expect(res.body[0].userId).toBe(userId)

    expect(res.body[0].product).toBeDefined()
    expect(res.body[0].product.id).toBe(product.id)

    await product.destroy()

});