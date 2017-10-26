const userRoutes = require("./users")
const productRoutes = require("./products")

const constructorMethod = (app) => {
    app.use("/users", userRoutes)
    app.use("/products", productRoutes)

    app.use("*", (req, res) => {
        res.sendStatus(404);
    })
}

module.exports = constructorMethod