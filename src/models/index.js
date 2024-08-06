const User = require("./User")
const Category = require("./Category")
const Product = require("./Product")
const Cart = require("./Cart")
const Purchase = require("./Purchase")
// const User = require("./User")

//Product -> categoryId
Product.belongsTo(Category)
Category.hasMany(Product)

//cart - userId

Cart.belongsTo(User)
User.hasMany(Cart)

Cart.belongsTo(Product)
Product.hasMany(Cart)

//Purchase -> UserId
Purchase.belongsTo(User)
User.hasMany(Purchase)

//Purchase -Products
Purchase.belongsTo(Product)
Product.hasMany(Purchase)
