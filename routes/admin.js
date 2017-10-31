const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;

router.get("/", async (req, res) => {
    res.render("admin/dashboard", {layout: "admin"})
})

router.get("/user", async (req, res) => {
    res.render("admin/user", {
        layout: "admin",
        helpers: {
            scripts() {
                return `<script src="/public/js/admin/user.js"></script>`
            }
        }
    })
})
router.post("/user", async (req, res) => {
    try {
        await userData.addUser(req.body)
    } catch (e) {

    }
})

module.exports = router