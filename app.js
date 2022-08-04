const express = require("express");
const { Op, col } = require("sequelize");
const {sequelize, product,category,cart,history} = require("./models");

const app = express();
app.use(express.json());


/*

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
            {active : false },
            {where : {id : id}
        });

        return res.json(nom);
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

*/

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

/*

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


//get product with description
app.get("/Clothing/:description", async(req,res) => {
    const description = req.params.description;
    try{
        const des = await product.findAll({
            where : {description : description}
        });

        return res.json(des);
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

*/


//trying filters
app.get("/searchname", async(req,res) => {
    const options = req.query;
    try{
        const filter = await product.findAll({
            where : {
                name : {
                    [Op.iLike]: `%${options.name}%`
                },
                // description : {
                //     [Op.iLike]: `%${options.description}%`
                // }
                //category_id : {
                //    [Op.iLike]: `%${options.category_id}%`
                //}
            }
        });

        return res.json(filter);
    } catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
});

/*

app.get("/products", async(res,req)=>{
    const {Op}= require("sequelize");
    const {name,category_id,description,price} = req.query;
    try{
        let options = {where: {} };
        if(name){
            options.where.name={
                [Op.substring]:name
            }
        }
        if(category_id){
            options.where.category_id=category_id;
        }
        if(description) {
            options.where.description={
                [Op.substring]:description
            }
        }
        if(price){
            options.where.price=price
        }

        const filter = await product.findAll(options)
        return res.json(filter)
    }catch(err){
        console.log(err)
        return res.statusCode(500).json(err);
    }
});

*/


app.get('/products',async(req,res)=>{
    const { Op } = require("sequelize");
    const {id,name,category_id,priceUpper,priceLower,description}= req.query
    try{
        let options = { where: {} };
        if(id){
            options.where.id=id
        }
        if(category_id){
            options.where.category_id=category_id
        }
        if(priceUpper && priceLower){
            options.where.price={
                [Op.and]: {
                   [Op.lte]: priceUpper,
                   [Op.gte]: priceLower
                }
            }
        }
        if(name){
            options.where.name={
                [Op.substring]:name
            }
        }
        if(description){
            options.where.description={
                [Op.substring]:description
            }
        }
        const producta=await product.findAll(options)
        return res.json(producta)
    }catch(err){
        console.log(err)
        return res.status(500).json({err})
    }
})



app.listen({port : 5000 }, async() => {
    console.log("server up on port 5000");
    await sequelize.authenticate();
    console.log("database connected");
})
