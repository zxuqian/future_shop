const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;
const productData = data.products
const orderData = data.orders
const categoryData = data.categories
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'site_content/uploads/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "." + file.originalname.split(".").pop())
    }
})

const upload = multer({
    storage: storage
})

router.get("/", async(req, res) => {
    try {
        if (!req.user) {
            res.redirect("/")
            return
        }
        // let products = await productData.getProductByCategory(req.params.categoryId)
        let categories = await categoryData.getAllCategories()
        let ordersByUser = await orderData.getAllOrders(req.user._id)
        let cart = []
        if (req.session.cart) {
            cart = req.session.cart
        }
        res.render('account', {
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

router.get("/profile", async(req, res) => {
    try {
        if (!req.user) {
            res.redirect("/")
            return
        }
        // let products = await productData.getProductByCategory(req.params.categoryId)
        let categories = await categoryData.getAllCategories()
        let cart = []
        if (req.session.cart) {
            cart = req.session.cart
        }
        res.render('account', {
            //products,
            categories,
            cart,
            user: req.user,
            profile_page: true,
            helpers: {
                scripts() {
                    return `<script src="/public/js/user.js"></script>`
                }
            }
        })
    } catch (e) {
        res.status(500).send("Error getting all product: " + e)
    }
})

router.put("/profile", upload.single('profile'), async(req, res) => {
    // console.log(req.body)
    // console.log(req.file)
    try {
        let user = {
            email: req.body.email,
            username: req.body.username,
            homeAddress: {
                addressLine1: req.body.addressLine1,
                addressLine2: req.body.addressLine2,
                city: req.body.city,
                state: req.body.state,
                zipCode: req.body.zipCode,
                country: req.body.country,
                phoneNumber: req.body.phoneNumber,
            },
            profile: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                dateOfBirth: req.body.dateOfBirth,
                age: req.body.age,
                profileImage: req.body.profileImage
            }
        }
        if(req.file) {
            user.profile.profileImage = req.file.path
        }
        let userId = req.body._id
        await userData.updateUser(userId, user)
        res.status(200).json({success: true})
        
    } catch (e) {
        res.status(500).json("Error updating user")
    }
    
})

module.exports = router