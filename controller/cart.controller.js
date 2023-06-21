const express = require("express");

const port = 3000;
const app = express();


app.get("/", (req, res)=> {
    return res.send("Welcome");
});

app.get("/api/cart", async(req, res) => {
    try {
        let data = await CartModel.find();
        return res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/api/cart/:id", async(req, res) => {
    try {
        const id = req.params.id;
        let data = await CartModel.findOne(id);
        return res.status(200).send(data);        
    } catch (error) {
        res.status(500).send(error);
    }

});

app.patch("/api/cart/edit/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const payload = req.body;
        let newData = await CartModel.findOneAndUpdate(id, payload);
        return res.status(202).send(`Product of id: ${id} updated`);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post("/api/cart/add", async(req, res) => {
    try {
        const payload = req.body;
        let newData = new CartModel(payload);
        await newData.save();
        return res.status(201).send(`Product added to the collection`);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete("api/cart/delete/:id", async(req, res) => {
    try {
        const id = req.params.id;
        await CartModel.findOneAndDelete(id);
        return res.status(204).send(`Product of id: ${id} deleted`);
    } catch (error) {
        res.status(500).send(error);
    }
})


app.listen(port, ()=> {
    console.log(`Server running at port: ${port}`);
})
