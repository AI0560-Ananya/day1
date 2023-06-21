const jwt = require("jsonwebtoken")
require("dotenv").config()
const { secretKey } = process.env

const users = [{
  id: 1, name: "Ananya", email: "ananya@gmail.com", password: "123"
}]

exports.fetch = (req, res) => {
  res.send(users)
}

exports.registerUser = (req, res) => {
  const { name, password, email } = req.body

  if (!name && !password && !email) return res.status(400).send("Please fill all the details")

  const existingUser = users.find((user) => user.email === email)
  if (existingUser) return res.status(409).send(`${name}, already resgistered, try logging in`)

  users.push({
    id: users.length + 1, name, password, email
  })
  
  return res.status(201).send(`${name}, registeration sucessfull`)
}

exports.loginUser = (req, res) => {
  const { name, password, email } = req.body

  if (!name && !password && !email) return res.status(400).send("Please fill all the details")

  const existingUser = users.find((user) => user.email === email)
  if (!existingUser) return res.status(401).send("Invaild credentials")

  const token = jwt.sign({
    user: existingUser.id
  }, secretKey, { expiresIn: "1h" })

  return res.status(201).send(token)
}
