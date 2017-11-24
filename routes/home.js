const express = require("express")
const router = express.Router()
const data = require("../data")
const userData = data.users
const productData = data.products
const categoryData = data.categories
const passport = require("passport")

router.get("/", async(req, res) => {
    try {
        let products = await productData.getAllProducts()
        let categories = await categoryData.getAllCategories()
        let cart = []
        if(req.session.cart) {
            cart = req.session.cart
        }
        res.render('index', {
            products,
            cart,
            categories,
            user: req.user
        })
    } catch (e) {
        res.status(500).send("Error getting all product: " + e)
    }
})

router.post("/register", async(req, res) => {
    try {
        let newUser = await userData.addUser(req.body)
        res.sendStatus(200)
    } catch (e) {
        res.status(500).send("Error getting all product: " + e)
    }
})

// Login
router.post("/login", passport.authenticate('local'), async(req, res) => {
    res.status(200).json(req.user)
})

router.get("/logout", async(req, res) => {
    req.logout()
    res.redirect("/")
})

router.get("/isLoggedIn", async(req, res) => {
    res.status(200).json(req.user != null)
})

module.exports = router