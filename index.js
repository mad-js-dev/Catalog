
const express = require('express');
const https = require("https");
var bodyParser = require('body-parser');
const { MongoClient } = require("mongodb");
const basicAuth = require('express-basic-auth')


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

    https
    .createServer(app)
    .listen(process.env.PORT || 80, ()=>{
      console.log('server is runing at port 80')
    });

    var jsonParser = bodyParser.json()
    const port = process.env.PORT || 80;
    
    app.use(cors())
    
    

    app.get('/', (req, res, next) => {

      // -----------------------------------------------------------------------
      // authentication middleware
    
      const auth = {login: 'hedy', password: 'admin'} // change this
    
      // parse login and password from headers
      const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
      const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')
    
      // Verify login and password are set and correct
      if (login && password && login === auth.login && password === auth.password) {
        // Access granted...
        return next()
      }
    
      // Access denied...
      res.set('WWW-Authenticate', 'Basic realm="401"') // change this
      res.status(401).send('Authentication required.') // custom message
    
      // -----------------------------------------------------------------------
    
    })

    app.get('/api/createProduct', productQueries.createProduct)
    app.get('/api/getProducts', productQueries.readProducts)
    app.post('/api/updateProduct', jsonParser, productQueries.updateProduct)
    app.post('/api/deleteProduct', jsonParser, productQueries.deleteProduct)
    
    app.post("/api/uploadPicture", productsImages.uploadFiles);
    app.get("/files", productsImages.getListFiles);
    app.get("/files/:name", productsImages.download);

    app.get('/download', function(req, res){
      const file = `./Catalog-v0.1.apk`;
      res.download(file); // Set disposition and send it.
    });

    app.use(express.static('web-build'))

    //app.listen(port, () => console.log('server is running at port ' + port));
  } finally {
    //await client.close();
  }
}

run().catch(console.dir);