var bodyParser = require('body-parser');
const { MongoClient } = require("mongodb");
const path = require('path');
const baseData = require("./baseData.json");

// Replace the uri string with your MongoDB deployment's connection string.

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
let database;

let fakeData = [
  {
    name: "Product 1",
    state: 2,
    condition: 1,
    category: 1,
    subcategory: 2,
    designer: 1,
    color1: 3,
    color2: 5,
    material: 3,
    size: 2,
    description: "Lorem ipsum",
    pricebought: 20,
    salesprice: 30,
    pvp: 40,
    provider: "Amazon",
    paymentMethod: "Card",
    dateBought: Date.now(),
    dateSold: Date.now(),
    datePayed: Date.now(),
    invoice: "0X-XXXXXXXXXXXX",
    paymentLocation: "Bank",
    image: "https://picsum.photos/200/300",
  },
  {
    name: "Product 2",
    state: 3,
    condition: 1,
    category: 1,
    subcategory: 2,
    designer: 1,
    color1: 3,
    color2: 5,
    material: 3,
    size: 2,
    description: "Lorem ipsum",
    pricebought: 30,
    salesprice: 40,
    pvp: 50,
    provider: "Amazon",
    paymentMethod: "Card",
    dateBought: Date.now(),
    dateSold: Date.now(),
    datePayed: Date.now(),
    invoice: "0X-XXXXXXXXXXXX",
    paymentLocation: "Bank",
    image: "https://picsum.photos/200/300",
  },
  {
    name: "Product 3",
    state: 3,
    condition: 1,
    category: 1,
    subcategory: 2,
    designer: 1,
    color1: 3,
    color2: 5,
    material: 3,
    size: 2,
    description: "Lorem ipsum",
    pricebought: 40,
    salesprice: 50,
    pvp: 60,
    provider: "Amazon",
    paymentMethod: "Card",
    dateBought: Date.now(),
    dateSold: Date.now(),
    datePayed: Date.now(),
    invoice: "0X-XXXXXXXXXXXX",
    paymentLocation: "Bank",
    image: "https://picsum.photos/200/300",
  },
  {
    name: "Product 4",
    state: 3,
    condition: 1,
    category: 1,
    subcategory: 2,
    designer: 1,
    color1: 3,
    color2: 5,
    material: 3,
    size: 2,
    description: "Lorem ipsum",
    pricebought: 50,
    salesprice: 60,
    pvp: 70,
    provider: "Amazon",
    paymentMethod: "Card",
    dateBought: Date.now(),
    dateSold: Date.now(),
    datePayed: Date.now(),
    invoice: "0X-XXXXXXXXXXXX",
    paymentLocation: "Bank",
    image: "https://picsum.photos/200/300",
  },
  {
    name: "Product 5",
    state: 3,
    condition: 1,
    category: 1,
    subcategory: 2,
    designer: 1,
    color1: 3,
    color2: 5,
    material: 3,
    size: 2,
    description: "Lorem ipsum",
    pricebought: 60,
    salesprice: 70,
    pvp: 80,
    provider: "Amazon",
    paymentMethod: "Card",
    dateBought: Date.now(),
    dateSold: Date.now(),
    datePayed: Date.now(),
    invoice: "0X-XXXXXXXXXXXX",
    paymentLocation: "Bank",
    image: "https://picsum.photos/200/300",
  },
  {
    name: "Product 6",
    state: 3,
    condition: 1,
    category: 1,
    subcategory: 2,
    designer: 1,
    color1: 3,
    color2: 5,
    material: 3,
    size: 2,
    description: "Lorem ipsum",
    pricebought: 70,
    salesprice: 80,
    pvp: 90,
    provider: "Amazon",
    paymentMethod: "Card",
    dateBought: Date.now(),
    dateSold: Date.now(),
    datePayed: Date.now(),
    invoice: "0X-XXXXXXXXXXXX",
    paymentLocation: "Bank",
    image: "https://picsum.photos/200/300",
  },
];

async function run() {
  try {
    database = await client.db("erp");
    
    await database
      .collection("products")
      .deleteMany({})

    fakeData.map(async (prod) => {
      await database
      .collection("products")
      .insertOne(prod)
      .then(editRes => {
          console.log('Item created', editRes);
      })
    })
    
  } finally {
    //await client.close();
  }
}


async function loadFakeData() {
  
}
run().catch(console.dir);