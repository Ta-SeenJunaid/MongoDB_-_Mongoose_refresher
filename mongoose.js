const mongoose = require("mongoose");

const Product = require("./models/product");

require("dotenv").config();
const password = process.env.MONGO_PASSWORD; // Get password from env
mongoose
  .connect(
    `mongodb+srv://taseenjunaid:${password}@cluster0.4hltx.mongodb.net/products?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("Connected to database!!!");
  })
  .catch(() => {
    console.log("Connection failed!!!");
  });

const createProduct = async (req, res, next) => {
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  });
  const result = await createdProduct.save();

  res.json(result);
};

const getProducts = async (req, res, next) => {
  const products = await Product.find().exec();
  res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
