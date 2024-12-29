require("dotenv").config();

const { MongoClient } = require("mongodb");

const password = process.env.MONGO_PASSWORD; // Get password from env
const url = `mongodb+srv://taseenjunaid:${password}@cluster0.4hltx.mongodb.net/products?retryWrites=true&w=majority&appName=Cluster0`;

const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };
  const client = new MongoClient(url);
  try {
    await client.connect();
    const db = client.db();
    const result = db.collection("products").insertOne(newProduct);
  } catch (error) {
    return res.json({ message: "Could not store data." });
  } /* finally {
    await client.close();
  } */
  res.json(newProduct);
};

const getProducts = async (req, res, next) => {
  const client = new MongoClient(url);
  let products;
  try {
    await client.connect();
    const db = client.db();
    products = await db.collection("products").find().toArray();
  } catch (error) {
    return res.json({ message: "Could not retrieve products." });
  }
  res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
