const express = require("express")
const userRouter = require("./route/user.route")
const productRouter = require("./route/product.route")
require("dotenv").config()

const { port } = process.env
const app = express()
app.use(express.json())
app.get("/", (req, res) => res.send("Welcome"))

app.use("/api/cart/", productRouter)
app.use("/api/user/", userRouter)

app.listen(port, () => {
  console.log(`Server running at port: ${port}`)
})
