const usersData = require("./users")
const productsData = require("./products")
const ordersData = require("./orders")
const categoriesData = require("./categories")
const recipientsData = require("./recipients")

module.exports = {
    users: usersData,
    products: productsData,
    orders: ordersData,
    categories: categoriesData,
    recipients: recipientsData
}