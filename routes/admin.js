const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;

router.get("/", (req, res) => {
    res.render("admin/dashboard", {layout: "admin"})
})

router.get("/user", (req, res) => {
    
})

module.exports = router