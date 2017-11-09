const userRoutes = require("./users")
const productRoutes = require("./products")
const adminRoutes = require("./admin")
const homeRoutes = require("./home")
const cartRoutes = require("./cart")

const constructorMethod = (app) => {
    app.use("/user", userRoutes)
    app.use("/product", productRoutes)
    app.use("/admin", adminRoutes)
    app.use("/cart", cartRoutes)

    app.use("/", homeRoutes)

    app.use("*", (req, res) => {
        res.sendStatus(404);
    })
}

module.exports = constructorMethod