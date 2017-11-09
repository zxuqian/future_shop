const express = require("express")
const router = express.Router()
const data = require("../data")
const userData = data.users
const productData = data.products
const categoryData = data.categories

router.get("/category/:categoryId", async(req, res) => {
    try {
        let products = await productData.getProductByCategory(req.params.categoryId)
        let categories = await categoryData.getAllCategories()
        let cart = []
        if(req.session.cart) {
            cart = req.session.cart
        }
        res.render('product', {
            products,
            cart,
            categories,
            user: req.user
        })
    } catch (e) {
        res.status(500).send("Error getting all product: " + e)
    }
})

router.post("/search", async(req, res) => {
    try {
        let products = await productData.getProductBySearch(req.body.searchTerm)
        let categories = await categoryData.getAllCategories()
        let cart = []
        if(req.session.cart) {
            cart = req.session.cart
        }
        res.render('product', {
            products,
            cart,
            categories,
            user: req.user
        })
    } catch (e) {
        res.status(500).send("Error getting all product: " + e)
    }
})




module.exports = router
