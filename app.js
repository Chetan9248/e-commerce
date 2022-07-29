const express = require("express");
const {sequelize, product,category,cart,history} = require("./models");

const app = express();
app.use(express.json());


//add category
app.post("/categories", async(req,res) => {
    const {category_name} = req.body;

    try {
        const categoryo = await category.create({category_name});

        return res.json(categoryo);
    } catch(err){
        console.log(err);
        return res.status(500).json(err);
    }

});


//add product
app.post("/products", async(req,res) => {
    const {name,category_id,description,price} = req.body;

    try {
        const producto = await product.create({name,category_id,description,price});

        return res.json(producto);
    } catch(err){
        console.log(err);
        return res.status(500).json(err);
    }

});


//add product in history
app.post("/history", async(req,res) => {
    const {product_name,product_id,quantntity,price,total} = req.body;

    try {
        const producto = await history.create({product_name,product_id,quantntity,price,total});

        return res.json(producto);
    } catch(err){
        console.log(err);
        return res.status(500).json(err);
    }

});


//add product to cart
app.post("/cart", async(req,res) => {
    const {product_id,product_name,price,quantntity,total,active} = req.body;

    try {
        const producto = await cart.create({product_id,product_name,price,quantntity,total,active});

        return res.json(producto);
    } catch(err){
        console.log(err);
        return res.status(500).json(err);
    }

});


//get all products in cart
app.get("/cart", async(req,res) => {
    try{
        const activee = await cart.findAll({
            where : {active : true}
        });

        return res.json(activee);
    } catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
});

//remove a product from cart
app.put("/remove_cart/:id", async(req,res) => {
    const id = req.params.id;
    try{
        const nom = await cart.update(
            {active : true},
            {where : {id : id}
        });

        return res.json("removed item no: " + id);
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
})


//get all products from history
app.get("/history", async(req,res) => {
    try{
        const producte = await history.findAll();

        return res.json(producte);
    } catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
});


//get all products
app.get("/products", async(req,res) => {
    try{
        const producte = await product.findAll();

        return res.json(producte);
    } catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
});


//get all categories
app.get("/categories", async(req,res) => {
    try{
        const categoryp = await category.findAll();

        return res.json(categoryp);
    } catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
});


//get one product each from all the categories
/*app.get("/one_product_each", async(req,res) => {
    try{
        const charactero = await product.findOne({
            where : {category_id : category_id}
        });

        return res.json(charactero);
    } catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
});*/


//get all products with a specific category_id
app.get("/products/category/:category_id", async(req,res) => {
    const category_id = req.params.category_id;
    try{
        const charactero = await product.findAll({
            where : {category_id : category_id}
        });

        return res.json(charactero);
    } catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
});


//get product with name
app.get("/products/:name", async(req,res) => {
    const name = req.params.name;
    try{
        const namee = await product.findAll({
            where : {name : name}
        });

        return res.json(namee);
    } catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
});


//get product with exact name
app.get("/products/:name", async(req,res) => {
    const name = req.params.name;
    try{
        const namee = await product.findAll({
            where : {name : name}
        });

        return res.json(namee);
    } catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
});


//get products >= a price
app.get("/products/higherCap/:leastPrice", async(req,res) => {
    const leastPrice = req.params.leastPrice;
    const { Op } = require("sequelize");
    
    try{
        const namee = await product.findAll({
            where:{price: {
                [Op.gte]: leastPrice
            }}
        })

        return res.json(namee);
    } catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
});


//get products <= a price
app.get("/products/lowerCap/:leastPrice", async(req,res) => {
    const leastPrice = req.params.leastPrice;
    const { Op } = require("sequelize");
    
    try{
        const namee = await product.findAll({
            where:{price: {
                [Op.lte]: leastPrice
            }}
        })

        return res.json(namee);
    } catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
});



app.listen({port : 5000 }, async() => {
    console.log("server up on port 5000");
    await sequelize.authenticate();
    console.log("database connected");
})
