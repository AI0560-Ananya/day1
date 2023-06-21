const cart = [{ id: 1, title: "T-Shirt", price: 500 }]

exports.fetchCart = (req, res) => {
  if (!cart.length) return res.status(200).send("Your cart is Empty")
  return res.send(cart)
}

exports.fetchCartById = (req, res) => {
  try {
    const id = +req.params.id
    const item = cart.find((items) => items.id === id)
    if (!item) return res.status(404).send(`Product with id: ${id} not found`)
    return res.status(200).send(item)
  } catch (error) {
    console.log(error)
    return res.send(error)
  }
}

exports.addProducts = (req, res) => {
  const { title, price } = req.body
  const newItem = { id: cart.length + 1, title, price }
  cart.push(newItem)
  return res.status(201).send(cart)
}

exports.editProduct = (req, res) => {
  const id = +(req.params.id)
  const { title, price } = req.body
  const item = cart.find((items) => items.id === id)

  if (!cart) return res.status(404).send(`Product with id: ${id} not found`)

  item.title = title
  item.price = price
  return res.status(202).send(`Product with id: ${id} has been updated`)
}

exports.deletedProduct = (req, res) => {
  const id = +(req.params.id)
  const item = cart.find((items) => items.id === id)

  if (!item) return res.status(404).send(`Product with id: ${id} not found`)

  cart.splice(item, 1)
  return res.status(204).send(`Product with id: ${id} has been deleted`)
}
