
const express = require('express');
var bodyParser = require('body-parser');
const { MongoClient } = require("mongodb");

const dbConfig = require("./config/db");
const path = require('path');
const baseData = require("./baseData.json");
const cors = require('cors');
const { query } = require('express');

var productsQueries = require("./controllers/products.js")
var productsImages = require("./controllers/images.js")

const uri = "mongodb://localhost:27017";
const client = new MongoClient(dbConfig.url);
let database;
let settings;

async function run() {
  try {
    database = await client.db(dbConfig.database)

    settings = database.collection("settings")
    products = database.collection("products")
    productQueries = new productsQueries(database)

    const app = express();
    var jsonParser = bodyParser.json()
    const port = process.env.PORT || 80;
    app.use(express.static('web-build'))

    app.use(cors())

    app.get('/api/createProduct', productQueries.createProduct)
    app.get('/api/getProducts', productQueries.readProducts)
    app.post('/api/updateProduct', jsonParser, productQueries.updateProduct)
    app.post('/api/deleteProduct', jsonParser, productQueries.deleteProduct)
    app.post("/api/uploadPicture", productsImages.uploadFiles);
    app.get("/files", productsImages.getListFiles);
    app.get("/files/:name", productsImages.download);

    app.listen(port, () => console.log('server is running at port ' + port));
  } finally {
    //await client.close();
  }
}

run().catch(console.dir);