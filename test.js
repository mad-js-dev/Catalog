const express = require('express');
var bodyParser = require('body-parser');
const { MongoClient } = require("mongodb");
var ObjectId = require('mongodb').ObjectId;
const path = require('path');
const baseData = require("./baseData.json");
const cors = require('cors');
const { query } = require('express');

// Replace the uri string with your MongoDB deployment's connection string.

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
let database;
let settings;
let productTemplate = {
  name: "New product",
  dateBought: "",
  dateSold: "",
  ownerName: "",
  state: -1,
  category: -1,
  subcategory: -1,
  designer: -1,
  color1: -1,
  color2: -1,
  material: -1,
  size: -1,
  condition: -1,
  description: "",
  available: -1,
  priceBought: "",
  minPrice: "",
  price: "",
  paymentLocation: "",
  paymentMethod: "",
  paymentDate: "",
  paymentInvoice: "",
  image: "",
};

async function run() {
  try {
    database = await client.db("erp");
    settings = database.collection("settings");
    products = database.collection("products");

    const app = express();
    var jsonParser = bodyParser.json()
    const port = process.env.PORT || 80;
    app.use(express.static('web-build'))

    app.use(cors())

    app.get('/api/getProducts', getProducts)
    app.get('/api/createProduct', createProduct)
    app.post('/api/updateProduct', jsonParser, updateProduct)
    app.post('/api/deleteProduct', jsonParser, deleteProduct)

    app.listen(port, () => console.log('server is running at port ' + port));
  } finally {
    //await client.close();
  }
}

async function createProduct(req, res) {
  console.log("Creating product:",productTemplate )
  let object = {...productTemplate};
  object.lastEdit = Date.now()
  delete object._id
  let queryResult =  await database
    .collection("products")
    .insertOne(object)

  let productsQueryResult =  await database
    .collection("products")
    .find({})
    .toArray()

  console.log(queryResult)
  
  if(queryResult.acknowledged) {
    console.log(queryResult.insertedId)
    res.send({id: queryResult.insertedId.toString(), products: productsQueryResult })
  }
}

async function getProducts(req, res) {
  console.log("Getting products list...")
  const result = await getAllProducts()
  res.send(result)
}

async function updateProduct(req, res) {
  console.log('updateProduct', req.body)
  let set = req.body.product
  set.lastEdit = Date.now()
  delete set._id;
  console.log(set)
  let queryResult =  await database
    .collection("products")
    .updateOne(
        {_id: new ObjectId(req.body._id)}, { $set: set})  
  console.log(queryResult)
  const result = await getAllProducts()
  res.send(result)
}

async function deleteProduct(req, res) {
  console.log('deleteProduct', req.body)
  let queryResult =  await database
    .collection("products")
    .deleteOne(
        {_id: new ObjectId(req.body._id)}, 
    )  
  console.log(queryResult)
  const result = await getAllProducts()
  res.send(result)
}

const getAllProducts = async () => {
  let productsQueryResult =  await database
    .collection("products")
    .find({})
    .toArray()
    console.log(productsQueryResult);
    return productsQueryResult;
}
const testConnection = async () => {
    // Query for a movie that has the title 'The Room'
    const query = {};
    const options = {};
    const result = await settings.findOne(query, options);

    console.log(result);
}


run().catch(console.dir);