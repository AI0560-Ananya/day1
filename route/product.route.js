const express = require("express")
const controller = require("../controller/product.controller")
const route = express.Router()

route.get("/", controller.fetchCart)

route.get("/:id", controller.fetchCartById)

route.post("/add/", controller.addProducts)

route.put("/edit/:id", controller.editProduct)

route.delete("/delete/:id", controller.deletedProduct)

module.exports = route
