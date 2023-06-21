const express = require("express")
const controller = require("../controller/user.controller")
const route = express.Router()

route.post("/register", controller.registerUser)

route.post("/login", controller.loginUser)

route.get("/", controller.fetch)

module.exports = route
