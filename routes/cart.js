const express = require("express")
const router = express.Router()
const data = require("../data")
const passport = require("passport")
const userData = data.users
const productData = data.products
const recipientData = data.recipients
const orderData = data.orders
const categoryData = data.categories

/**
 * 
 * Cart {
 *     product,
 *     quantity
 * }
 * 
 */

router.post("/", async(req, res) => {
    try {
        if(!req.session.cart) {
            req.session.cart = []
        }

        let cart = req.session.cart
        let index = cart.findIndex((val) => {
            return val.product._id === req.body.productId
        })
        if(index != -1) {
            let existing = cart[index]
            existing.quantity = parseInt(existing.quantity) + 1
            //cart[index] = existing
        } else {
            let product = await productData.getProductById(req.body.productId)
            req.session.cart.push({product, quantity: req.body.quantity})
        }
        res.send('' + cart.length)
    } catch (e) {
        res.status(500).send("Error add to cart: " + e)
    }
})

router.get("/", async(req, res) => {
    try {
        let message = ""
        if(req.query.error == "notloggedin") {
            message = "You must login to proceed"
        }
        let cart = []
        if(req.session.cart) {
            cart = req.session.cart
        }
        let categories = categoryData.getAllCategories()
        res.render("cart", {
            layout: "main",
            cart,
            message,
            categories,
            user: req.user,
            totalPrice: cart.reduce((previous, current, index) => {
                return previous += (parseInt(current.quantity) * parseFloat(current.product.price))
            }, 0),
            helpers: {
                scripts() {
                    return `<script src="/public/js/cart.js"></script>`
                }
            }
        })
    } catch (e) {
        res.status(500).send("Error get the cart: " + e)
    }
})

router.put("/", async(req, res) => {
    try {

        if(!req.session.cart) {
            req.session.cart = []
        }
        let cart = req.session.cart
        let index = cart.findIndex((val) => {
            return val.product._id === req.body.productId
        })
        if(index != -1) {
            let existing = cart[index]
            existing.quantity = req.body.quantity
            //cart[index] = existing
        }
        res.sendStatus(200)
    } catch (e) {
        res.status(500).send("Error add to cart: " + e)
    }
})

router.get("/checkout", async(req, res) => {
    try {
        if(!req.user) {
            res.redirect("/cart?error=notloggedin")
            return
        }
        let cart = []
        if(req.session.cart) {
            cart = req.session.cart
        }
        let recipients = await recipientData.getRecipientsByUserId(req.user._id)
        res.render("checkout", {
            layout: "main",
            cart,
            recipients,
            user: req.user,
            totalPrice: cart.reduce((previous, current, index) => {
                return previous += (parseInt(current.quantity) * parseFloat(current.product.price))
            }, 0),
            helpers: {
                scripts() {
                    return `<script src="/public/js/cart.js"></script>`
                }
            }
        })
    } catch (e) {
        res.status(500).send("Error get the cart: " + e)
    }


})

router.post("/checkout", async(req, res) => {
    try {
        if(!req.user) {
            res.redirect("/cart?error=notloggedin")
            return
        }
        let cart = []
        if(req.session.cart) {
            cart = req.session.cart
        }

        let recipientId = req.body.recipient
        if(req.body.useNewAddress === 'on') {
            let recipient = {
                userId: req.user._id,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                addressLine1: req.body.addressLine1,
                addressLine2: req.body.addressLine2,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                zipCode: req.body.zipCode,
                phoneNumber: req.body.phoneNumber
            }
            recipientId = await recipientData.addRecipient(recipient)
        }

        let totalPrice = cart.reduce((previous, current, index) => {
            return previous += (parseInt(current.quantity) * parseFloat(current.product.price))
        }, 0)
        let products = new Array()
        for(let item of cart) {
            products.push({
                _id: item.product._id,
                quanity: item.quantity,
            })
        }

        let order = {
            recipient: recipientId,
            products,
            status: "paid",
            orderDate: new Date(),
            priceTotal: totalPrice
        }

        await orderData.addOrder(req.user._id, order)

        res.render("thankyou")
    } catch (e) {
        res.status(500).send("Error get the cart: " + e)
    }


})



module.exports = router