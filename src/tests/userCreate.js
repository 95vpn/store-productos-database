const User = require("../models/User")

const userCreate = async() => {

    const user = {
        firstName: "Yoneison",
        lastName: "Bayona",
        address: "calle1",
        email: "yoneison@gmail.com",
        password: "yoneison1234",
        phone: "555555",
    }
    await User.create(user)
}

module.exports = userCreate;