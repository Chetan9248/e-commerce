const express = require("express");
const {sequelize, product,category} = require("./models");

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

//get one product with a specific category_id
/*app.get("/products/:category_id", async(req,res) => {
    const category_id = req.params.category_id;
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
app.get("/products/:category_id", async(req,res) => {
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

app.listen({port : 5000 }, async() => {
    console.log("server up on port 5000");
    await sequelize.authenticate();
    console.log("database connected");
})
