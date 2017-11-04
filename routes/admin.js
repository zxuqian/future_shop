const express = require("express")
const router = express.Router()
const data = require("../data")
const userData = data.users
const categoryData = data.categories
const productData = data.products
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'site_content/uploads/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "." + file.originalname.split(".").pop())
    }
  })

const upload = multer({ storage: storage})

var hbs = require('express-handlebars').create({
    helpers: {
        sequence(index) {
            return index + 1
        }
    }
});

router.get("/", async (req, res) => {
    res.render("admin/dashboard", {layout: "admin"})
})


/****************************************************************
 * 
 * User routes
 * 
 * 
 ****************************************************************/
router.get("/user", async (req, res) => {
    let allUsers = await userData.getAllUsers()
    res.render("admin/user", {
        layout: "admin",
        allUsers,
        helpers: {
            scripts() {
                return `<script src="/public/js/admin/user.js"></script>`
            },
            sequence(index) {
                return index + 1
            }
        }
    })
})

router.get("/user/:id", async(req, res) => {
    let user = await userData.getUserById(req.params.id, {orders: 0})
    res.json(user)
})

router.post("/user", async (req, res) => {
    try {
        await userData.addUser(req.body)
        let allUsers = await userData.getAllUsers()
        
        hbs.render("views/partials/admin/user-table.handlebars", {
            users: allUsers
        }).then((html) => {
            res.send(html)
        })
    } catch (e) {
        res.json(500, "Error adding user")
    }
})

router.put("/user/:id", async (req, res) => {
    try {
        await userData.updateUser(req.params.id, req.body)
        let allUsers = await userData.getAllUsers()
        
        hbs.render("views/partials/admin/user-table.handlebars", {
            users: allUsers
        }).then((html) => {
            res.send(html)
        })
    } catch (e) {
        res.json(500, "Error adding user")
    }
})

router.delete("/user/:id", async (req, res) => {
    try {
        await userData.removeUser(req.params.id)
        let allUsers = await userData.getAllUsers()
        hbs.render("views/partials/admin/user-table.handlebars", {
            users: allUsers
        }).then((html) => {
            res.send(html)
        })
    } catch (e) {
        res.json(500, "Error adding user")
    }
})

/*****************************************************************************
 * 
 * Category and product routes
 * 
 *****************************************************************************/


router.get("/product", async (req, res) => {
    let categories = await categoryData.getAllCategories()
    let products = await productData.getAllProducts()
    res.render("admin/product", {
        layout: "admin",
        categories,
        products,
        helpers: {
            scripts() {
                return `<script src="/public/js/admin/product.js"></script>`
            },
            sequence(index) {
                return index + 1
            }
        }
    })
})

router.post("/category", async (req, res) => {
    try {
        await categoryData.addRootCategory(req.body)
        let categories = await categoryData.getAllCategories()
        res.render("partials/admin/category-list", {
            layout: false,
            categories
        })
        
    } catch (e) {
        res.status(500).send("Error adding category: " + e)
    }
})

router.post("/category/:parentId", async (req, res) => {
    try {
        await categoryData.addSubCategory(req.params.parentId, req.body)
        let categories = await categoryData.getAllCategories()
        res.render("partials/admin/category-list", {
            layout: false,
            categories
        })
        
    } catch (e) {
        res.status(500).send("Error adding sub-category: " + e)
    }
})

router.delete("/category/:id", async (req, res) => {
    try {
        await categoryData.removeCategory(req.params.id)
        let categories = await categoryData.getAllCategories()
        res.render("partials/admin/category-list", {
            layout: false,
            categories
        })
        
    } catch (e) {
        res.status(500).send("Error removing category: " + e)
    }
})

router.delete("/category/:parentId/:subId", async (req, res) => {
    try {
        await categoryData.removeSubCategory(req.params.parentId, req.params.subId)
        let categories = await categoryData.getAllCategories()
        res.render("partials/admin/category-list", {
            layout: false,
            categories
        })
        
    } catch (e) {
        res.status(500).send("Error removing sub-category: " + e)
    }
})

// add product
router.post("/product", async (req, res) => {
    try {
        await productData.addProduct(req.body)
        let products = await productData.getAllProducts()
        res.render("partials/admin/product-table", {
            layout: false,
            products,
            helpers: {
                sequence(index) {
                    return index + 1
                }
            }
        })
        
    } catch (e) {
        res.status(500).send("Error adding product: " + e)
    }
})

// delete product
router.delete("/product/:id", async (req, res) => {
    try {
        await productData.removeProduct(req.params.id)
        let products = await productData.getAllProducts()
        res.render("partials/admin/product-table", {
            layout: false,
            products,
            helpers: {
                sequence(index) {
                    return index + 1
                }
            }
        })
        
    } catch (e) {
        res.status(500).send("Error removing product: " + e)
    }
})


// Router upload
router.post('/upload', upload.single('image'), (req, res) => {
    //console.log(req.file)
    res.status(200).json({path: req.file.path})
})

module.exports = router