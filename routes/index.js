const userRoutes = require("./users")
const productRoutes = require("./products")
const adminRoutes = require("./admin")

const constructorMethod = (app) => {
    app.use("/users", userRoutes)
    app.use("/products", productRoutes)
    app.use("/admin", adminRoutes)

    app.use("/", (req, res) => {
        res.render('index')
    })

    app.use("*", (req, res) => {
        res.sendStatus(404);
    })
}

module.exports = constructorMethod