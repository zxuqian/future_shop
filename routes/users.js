const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;
const productData = data.products
const orderData = data.orders
const categoryData = data.categories

router.get("/profile", async(req, res) => {
    try {
        if(!req.user) {
            res.redirect("/")
            return
        }
        // let products = await productData.getProductByCategory(req.params.categoryId)
        let categories = await categoryData.getAllCategories()
        let ordersByUser = await orderData.getAllOrders(req.user._id)
        let cart = []
        if(req.session.cart) {
            cart = req.session.cart
        }
        res.render('userProfile', {
            //products,
            cart,
            orders: ordersByUser.orders,
            categories,
            order_page: true,
            user: req.user,
            helpers: {
                formateDate(date) {
                    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay()
                }
            }
        })
    } catch (e) {
        res.status(500).send("Error getting all product: " + e)
    }
})

module.exports = router