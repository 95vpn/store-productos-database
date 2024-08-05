const User = require("./User")
const Category = require("./Category")
const Product = require("./Product")
const Cart = require("./Cart")
// const User = require("./User")

//Product -> categoryId
Product.belongsTo(Category)
Category.hasMany(Product)

//cart - userId

Cart.belongsTo(User)
User.hasMany(Cart)

Cart.belongsTo(Product)
Product.hasMany(Cart)