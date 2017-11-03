const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;
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

module.exports = router