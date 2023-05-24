var ObjectId = require('mongodb').ObjectId;

module.exports = class ProductQueries {
  constructor(db) {
    this.db = db;
    this.productTemplate =  {
      name: "New product",
      dateBought: "",
      dateSold: "",
      ownerName: "",
      state: 0,
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
      paymentLocation: -1,
      paymentMethod: -1,
      paymentDate: "",
      paymentInvoice: "",
      image: "",
      provPaymentMethod: -1,
    };
  }

  getAllProducts = async () => {
    let productsQueryResult =  await this.db
      .collection("products")
      .find({})
      .toArray()
      //console.log(productsQueryResult);
      return productsQueryResult;
  }
  
  createProduct = async (req, res) => {
    console.log("Creating product:",this.productTemplate )
    let object = {...this.productTemplate};
    object.lastEdit = Date.now()
    delete object._id
    let queryResult =  await this.db
      .collection("products")
      .insertOne(object)
  
    let productsQueryResult =  await this.db
      .collection("products")
      .find({})
      .toArray()
      
    if(queryResult.acknowledged) {
      console.log(queryResult.insertedId)
      res.send({id: queryResult.insertedId.toString(), products: productsQueryResult })
    }
  }
  
  readProducts = async (req, res) => {
    console.log("Getting products list...")
    const result = await this.getAllProducts()
    res.send(result)
  }
  
  updateProduct = async (req, res) => {
    console.log('updateProduct', req.body)
    let set = req.body.product
    set.lastEdit = Date.now()
    delete set._id;
    console.log(set)
    let queryResult =  await this.db
      .collection("products")
      .updateOne(
          {_id: new ObjectId(req.body._id)}, { $set: set})
    console.log(queryResult)
    const result = await this.getAllProducts()
    res.send(result)
  }
  
  deleteProduct = async (req, res) => {
    console.log('deleteProduct', req.body)
    let queryResult =  await this.db
      .collection("products")
      .deleteOne(
          {_id: new ObjectId(req.body._id)},
      )
    console.log(queryResult)
    const result = await this.getAllProducts()
    res.send(result)
  }
}